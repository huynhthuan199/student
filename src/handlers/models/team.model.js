import { compareTime } from '../../utils/TimeUtils';

const sortTeamByTime = (team1, team2, cmpTimes, leftMost = false) => {
    const time1 = cmpTimes.find((time) => time.teamId === team1.teamId);
    const time2 = cmpTimes.find((time) => time.teamId === team2.teamId);
    return compareTime(time1.value, time2.value, leftMost);
};

export { sortTeamByTime };
