import classNamesBinding from 'classnames/bind';

import { useEffect, useState } from 'react';
import {
    MAX_MS_OF_ONE_HOUR,
    MAX_POINT_OF_EVERY_GAME,
    SUBTRACT_POINT,
} from '../../app/constants';
import {
    compareTime,
    convertToHrMinSecMs,
    convertToHrMinSecMsText,
    convertToMs,
} from '../../utils/TimeUtils';
import styles from './scoreboard.module.scss';

const css = classNamesBinding.bind(styles);

const Scoreboard = ({ games, teams, times }) => {
    const [gameIdChoosen, setGameIdChoosen] = useState(1);
    const [rankedTimes, setRankedTimes] = useState([...times]);

    const handleChooserChanged = (e) => {
        let newGameIdChoosen = Number.parseInt(e.target.value);
        setGameIdChoosen(newGameIdChoosen);
    };

    const rankTimes = () => {
        let rankedTimes = [];
        if (gameIdChoosen > -1) {
            rankedTimes = [...times]
                .filter((time) => time.gameId === gameIdChoosen)
                .sort((time1, time2) => compareTime(time1.value, time2.value))
                .map((time, index) => {
                    const game = games.find((g) => g.gameId === time.gameId);
                    return {
                        ...time,
                        point:
                            game.status === 'initial' ||
                            game.status === 'playing'
                                ? 0
                                : game.maxOfPoint - index * SUBTRACT_POINT,
                    };
                });
        }else{
            rankedTimes = [...teams]
                .map((team, index) => {
                    const teamTimes = times.filter(
                        (time) => time.teamId == team.teamId
                    );
                    const totalTime = teamTimes.reduce(
                        (res, cur) => {
                            const { hr, min, sec, ms } = cur.value;
                            res.hr += hr;
                            res.min += min;
                            res.sec += sec;
                            res.ms += ms;
                            return res;
                        },
                        {
                            hr: 0,
                            min: 0,
                            sec: 0,
                            ms: 0,
                        }
                    );
                    console.log(team.gameId)
                    
                    return {
                        teamId: team.teamId,
                        value: convertToHrMinSecMs(totalTime),
                    };
                })
                .sort((time1, time2) => compareTime(time1.value, time2.value));
        }


        // add teamName
        rankedTimes = rankedTimes.map((time,index) => {
            const team = teams.find((team) => time.teamId === team.teamId);
            return {
                teamId: time.teamId,
                teamName: team.name,
                value: { ...time.value },
                point: 100 - index * SUBTRACT_POINT,
            };
        });
        return rankedTimes;
    };

    useEffect(() => {
        const newRankedTimes = rankTimes();
        setRankedTimes(newRankedTimes);
    }, [times]);

    useEffect(() => {
        const newRankedTimes = rankTimes();
        setRankedTimes(newRankedTimes);
    }, [gameIdChoosen]);

    const toshow = () => {
        return gameIdChoosen === -1 || games.find(e => e.gameId === gameIdChoosen)?.status === 'finished';
    }

    return (
        <div className={css('wrapper')}>
            <div className={css('inner')}>
                {/*    <h1 className={css('heading')}>
                    {console.log(
                        games.find((game) => game.id === gameIdChoosen)
                    )}
                </h1> */}
                <div className={css('chooser')}>
                    <h1>Choose game</h1>
                    <select
                        className={css('options')}
                        onChange={handleChooserChanged}
                        value={gameIdChoosen}
                    >
                        {games.map((game) => (
                            <option key={game.gameId} value={game.gameId}>
                                {game.name}
                            </option>
                        ))}
                        <option value="-1">Summary</option>
                    </select>
                </div>
                <div style = {{ display: toshow() ? 'block' : 'none'}}>
                <div className={css('scoreboard-header')}>
                    <div className={ gameIdChoosen === -1 ? css('col-33') : css('col-25')}>
                        <div className={css('cell')}>
                            <h1 className={css('col-label')}>Rank</h1>
                        </div>
                    </div>
                    <div className={ gameIdChoosen === -1 ? css('col-33') : css('col-25')}>
                        <div className={css('cell')}>
                            <h1 className={css('col-label')}>Team</h1>
                        </div>
                    </div>
                    <div className={ gameIdChoosen === -1 ? css('col-33') : css('col-25')}>
                        <div className={css('cell')}>
                            <h1 className={css('col-label')}>Time</h1>
                        </div>
                    </div>
                    <div className={css('col-25')} style = {{ display: gameIdChoosen === -1 ? 'none' : 'block'}}>
                        <div className={css('cell')}>
                            <h1 className={css('col-label')}>Point</h1>
                        </div>
                    </div>
                </div>
                <div className={css('records')}>
                    <div className={ gameIdChoosen === -1 ? css('col-33') : css('col-25')}>
                        {Array.from(Array(teams.length).keys()).map((rank) => (
                            <div className={css('cell')} key={rank + 1}>
                                <h3>{rank + 1}</h3>
                            </div>
                        ))}
                    </div>
                    <div className={ gameIdChoosen === -1 ? css('col-33') : css('col-25')}>
                        {rankedTimes.map((time) => {
                            return (
                                <div className={css('cell')} key={time.teamId}>
                                    <h3>{time.teamName}</h3>
                                </div>
                            );
                        })}
                    </div>
                    <div className={ gameIdChoosen === -1 ? css('col-33') : css('col-25')}>
                        {rankedTimes.map((time) => (
                            <div className={css('cell')} key={time.teamId}>
                                <h3>
                                    {convertToHrMinSecMsText(time.value)}
                                </h3>
                            </div>
                        ))}
                    </div>
                    <div className={css('col-25')} style = {{ display: gameIdChoosen === -1 ? 'none' : 'block'}}>
                        {rankedTimes.map((time, index) => (
                            <div className={css('cell')} key={index + 1}>
                                <h3>{time.point}</h3>
                            </div>
                        ))}
                    </div>
                </div>
                </div>
            </div>
        </div>
    );
};

export default Scoreboard;
