import classNamesBinding from 'classnames/bind';
import { convertToHrMinSecMsText } from '../../utils/TimeUtils';
import Button from '../button/button.component';
import styles from './game-control.module.scss';
import { chunkArray } from '../../utils/Helper';

const css = classNamesBinding.bind(styles);

const GameControl = ({ teams, game, times, turns, onStartGame, onStopTeamGame, onNextTurn }) => {

    const chunkTeamsByTurn = (team, turn)  => {
        const arrTeamAtTurn = chunkArray(team, team.length / turns);
        return arrTeamAtTurn[turn];
    }

    return (
        <div className={css('wrapper')}>
            <div className={css('inner')}>
                <h1 className={css('heading')}>{game.name} - Turn {game.turn + 1}</h1>
                <div className={css('time')}>
                    <h1>{convertToHrMinSecMsText(game.time)}</h1>
                    <Button
                        className={css('btn-in-cell')}
                        primary
                        disabled={
                            game.status === 'finished' ||
                            game.status === 'playing'
                        }
                        onClick={(e) => {
                            onStartGame(game.gameId);
                        }}
                    >
                        Start
                    </Button>
                    <Button
                        className={css('btn-in-cell')}
                        primary
                        disabled={
                            game.turn === turns - 1
                        }
                        onClick={(e) => {
                            onNextTurn(game.gameId);
                        }}
                    >
                        Next Turn
                    </Button>
                </div>
                <div className={css('records')}>
                    <div className={css('col-2')}>
                        <div className={css('cell')}>
                            <h1 className={css('col-label')}>Team</h1>
                        </div>
                        {chunkTeamsByTurn(teams, game.turn).map((team) => (
                            <div className={css('cell')} key={team.teamId}>
                                <h3>{team.name}</h3>
                            </div>
                        ))}
                    </div>
                    <div className={css('col-3')}>
                        <div className={css('cell')}>
                            <h1 className={css('col-label')}>Time</h1>
                        </div>
                        {chunkTeamsByTurn(teams, game.turn).map((team) => {
                            const time = times.find(
                                (time) =>
                                    time.gameId === game.gameId &&
                                    time.teamId === team.teamId
                            );
                            return (
                                <div
                                    className={css('cell', 'time')}
                                    key={team.teamId}
                                >
                                    <h3>
                                        {convertToHrMinSecMsText(
                                            time.value
                                        )}
                                    </h3>
                                    <Button
                                        className={css('btn-in-cell')}
                                        primary
                                        disabled={
                                            game.status === 'finished' ||
                                            game.status === 'initial' ||
                                            time.finished
                                        }
                                        onClick={(e) =>
                                            onStopTeamGame(
                                                team.teamId,
                                                game.gameId
                                            )
                                        }
                                    >
                                        Stop
                                    </Button>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GameControl;
