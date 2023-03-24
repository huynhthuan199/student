import { getLeadingZeroNumber } from './TextUtils';

const convertToHrMinSecMs = (time) => {
    let hr = time.hr || 0;
    let min = time.min || 0;
    let sec = time.sec || 0;
    let ms = time.ms || 0;
    if (ms >= 100) {
        sec = Number.parseInt(ms / 100);
        ms -= sec * 100;
        sec += time.sec || 0;
    }
    if (sec >= 60) {
        min = Number.parseInt(sec / 60);
        sec -= min * 60;
        min += time.min || 0;
    }
    if (min >= 60) {
        hr = Number.parseInt(min / 60);
        min -= hr * 60;
        hr += time.hr || 0;
    }
    return { hr, min, sec, ms };
};

const increaseByMs = (time) => {
    let { hr, min, sec, ms } = time;
    ms += 14 + Number.parseInt(Math.random() * 2);
    if (ms >= 100) {
        sec++;
        ms = 0;
    }
    if (sec >= 60) {
        min++;
        sec = 0;
    }
    if (min >= 60) {
        hr++;
        min = 0;
    }
    return { hr, min, sec, ms };
};
const convertToMs = (time) => {
    const { hr, min, sec, ms } = time;
    return hr * 60 * 60 * 60 + min * 60 * 60 + sec * 1000 + ms * 10;
};
const convertToHrMinSecMsText = (time) => {
    const temp = { hr: '00', min: '00', sec: '00', ms: '00' };
    if (time.hr) {
        temp.hr = getLeadingZeroNumber(time.hr, 2);
    }
    if (time.min) {
        temp.min = getLeadingZeroNumber(time.min, 2);
    }
    if (time.sec) {
        temp.sec = getLeadingZeroNumber(time.sec, 2);
    }
    if (time.ms) {
        temp.ms = getLeadingZeroNumber(time.ms, 2);
    }

    const result = `${temp.hr}:${temp.min}:${temp.sec}:${temp.ms}`;
    return result;
};

const compareTime = (time1, time2, leftMost = false) => {
    let result = time1.hr - time2.hr;
    if (result === 0) {
        result = time1.min - time2.min;
    }
    if (result === 0) {
        result = time1.sec - time2.sec;
    }
    if (result === 0) {
        result = time1.ms - time2.ms;
    }
    return leftMost ? -result : result;
};

export {
    convertToHrMinSecMs,
    convertToHrMinSecMsText,
    compareTime,
    increaseByMs,
    convertToMs,
};
