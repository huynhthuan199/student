export function Stopwatch(action) {
    this.action = action;
    this.time = { min: 0, sec: 0, ms: 0 };
    this.engineId = 0;
    this.start = function () {
        this.engineId = setInterval(() => {
            this.time.ms++;
            if (this.time.ms >= 100) {
                this.time.sec++;
                this.time.ms=0;
            }
            if (this.time.sec >= 60) {
                this.time.min++;
                this.time.sec = 0;
            }
            this.action(this.time.min, this.time.sec, this.time.ms);
        }, 10);
    };

    this.stop = function () {
        clearInterval(this.engineId);
    };
}
