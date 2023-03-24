import classNamesBinding from 'classnames/bind';
import styles from './standings.module.scss';
import { convertToMinuteSecond } from '../../utils/TimeUtils';
import { type } from '@testing-library/user-event/dist/type';
import { getLeadingZeroNumber } from '../../utils/TextUtils';

const css = classNamesBinding.bind(styles);

const Standings = ({ games, times, teams }) => {
    let teamTotalTimes = [];
    teams.forEach((team) => {
        let teamTotalTime = times.filter((time) => team.teamId === time.teamId);
        teamTotalTime = teamTotalTime.reduce(
            (temp, current) => {
                const { time } = temp;
                const { value } = current;
                const result = { ...temp };
                result.time = {
                    min: time.min + value.min,
                    sec: time.sec + value.sec,
                    ms: time.ms + value.ms,
                };
                return result;
            },
            {
                teamId: team.teamId,
                time: { min: 0, sec: 0, ms: 0 },
            }
        );
        teamTotalTime.time = convertToMinuteSecond(teamTotalTime.time);
        teamTotalTimes.push(teamTotalTime);
    });
    teamTotalTimes.sort((teamTotalTime1, teamTotalTime2) => {
        const time1 = teamTotalTime1.time;
        const time2 = teamTotalTime2.time;
        let temp = time1.min - time2.min;
        if (temp === 0) {
            temp = time1.sec - time2.sec;
        }
        if (temp === 0) {
            temp = time1.ms - time2.ms;
        }
        return temp;
    });

    return (
        <div className={css('standings')}>
            <h1 className={css('standings-heading')}>Standings</h1>
            <table className={css('team-data')}>
                <thead>
                    <tr>
                        <th>Rank</th>
                        <th>Team</th>
                        <th>Total time</th>
                    </tr>
                </thead>
                <tbody>
                    {teamTotalTimes.map((teamTotalTime, rank) => {
                        const team = teams.find(
                            (team) => team.teamId === teamTotalTime.teamId
                        );
                        let { min, sec, ms } = teamTotalTime.time;
                        min = getLeadingZeroNumber(min, 2);
                        sec = getLeadingZeroNumber(sec, 2);
                        ms = getLeadingZeroNumber(ms, 2);
                        return (
                            <tr key={rank + 1}>
                                <td>
                                    <h1>{rank + 1}</h1>
                                </td>
                                <td>
                                    <h1>{team.name}</h1>
                                </td>
                                <td>
                                    <h1>{`${min}:${sec}:${ms}`}</h1>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default Standings;
