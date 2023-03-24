import classNamesBinding from 'classnames/bind';
import { useEffect, useState, useRef } from 'react';
import GameControl from '../game-control/game-control.component';
import GameInitializer from '../game-initializer/game-initializer.component';
import Scoreboard from '../scoreboard/scoreboard.component';
import styles from './game.module.scss';
import {
    initTeams,
    initGames,
    initTimes,
} from '../../handlers/models/initmodels';
import { increaseByMs } from '../../utils/TimeUtils';

const css = classNamesBinding.bind(styles);

function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    });
    return ref.current;
  }

const Game = () => {
    const [teams, setTeams] = useState([]);
    const [games, setGames] = useState([]);
    const [times, setTimes] = useState([]);
    const turns = useRef(0);
    const [currentStop, setCurrentStop] = useState(1);

    const hanldeInitModels = (numOfTeams, numOfGames, numOfTurns) => {
        // delete old games
        games.forEach((game) => clearInterval(game.interval));
        const newTeams = initTeams(numOfTeams);
        const newGames = initGames(numOfGames, 0, numOfTeams);
        turns.current = numOfTurns
        const newTimes = initTimes(numOfTeams, numOfGames);
        setTeams(newTeams);
        setGames(newGames);
        setTimes(newTimes);
    };

    const handleStartGame = (gameId) => {

        setCurrentStop(1)
        const newGames = games.map((game) => {
            if (game.gameId === gameId) {
                game.status = 'playing';
                game.interval = setInterval(() => {
                    const newGames = [...games];
                    const game = newGames.find(
                        (game) => game.gameId === gameId
                    );
                    game.time = increaseByMs(game.time);
                    // console.log(game.time)
                    setGames(newGames);
                }, 140);
            }
            return game;
        });
        setGames(newGames);
    };

    const handleStopTeamGame = (teamId, gameId) => {


        const newTimes = times.map((time) => {
            if (time.gameId === gameId && time.teamId === teamId) {
                time.finished = true;
            }
            return time;
        });
        setTimes(newTimes);
        const last = newTimes.find(
            (time) => time.gameId === gameId && !time.finished
        );

        if(currentStop === teams.length / turns.current) {

            const newGames = [...games]
            const obj = newGames.find(e => e.gameId === gameId);

            clearInterval(obj.interval);
            setGames(newGames);
        }

        setCurrentStop( pre => pre += 1)

        if (!last) {
            const newGames = games.map((game) => {
                if (game.gameId === gameId) {
                    game.status = 'finished';
                    clearInterval(game.interval);
                }
                return game;
            });
            setGames(newGames);
        }
    };

    const handleTurnGame = (turn) => {
        
        const cloneGames = [...games];
        const obj = cloneGames.find(e => e.gameId === turn);
        obj.turn +=1;
        obj.time = { hr: 0, min: 0, sec: 0, ms: 0 };
        obj.status = 'initial'
        console.log(times)
        const newTimes = times.map((time) => {
            if (time.gameId === obj.gameId && time.finished === false) {
                time.value = { hr: 0, min: 0, sec: 0, ms: 0 };
            }
            return time;
        });
        console.log(newTimes)
        setTimes(newTimes);
        setGames(cloneGames);

    };

    useEffect(() => {
        const newTimes = times.map((time) => {
            const game = games.find((game) => game.gameId === time.gameId);
            if (!time.finished && game.status == 'playing') {
                time.value = { ...game.time };
            }
            return time;
        });
        setTimes(newTimes);
    }, [games]);

    return (
        <div className={css('wrapper')}>
            <div className={css('sidebar')}>
                <GameInitializer teams={teams} games={games} onInitModels={hanldeInitModels} />
                <Scoreboard teams={teams} games={games} times={times} />
            </div>
            <div className={css('content')}>
                <div className={css('content-wrapper')}>
                    <h1 className={css('heading')}>Game Status</h1>
                    <div className={css('spacer')}></div>
                    <div className={css('content-inner')}>
                        {games.map((game) => (
                            <GameControl
                                key={game.gameId}
                                teams={teams}
                                game={game}
                                times={times}
                                turns={turns.current}
                                onStartGame={handleStartGame}
                                onStopTeamGame={handleStopTeamGame}
                                onNextTurn={handleTurnGame}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Game;
