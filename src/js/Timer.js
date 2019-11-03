export class Timer {
    
    constructor(clock, start, laps) {
        this.intervalLength = 100;
        this.clock = clock;
        this.start = start;
        this.laps = laps;
        this.lapStart;
        this.interval;
        this.initialize();
        this.checkLocalStorage();
    }

    initialize() {
        this.time = 0;
        this.started = false;
        this.paused = false;
        this.setStartButtonColor('Start');
        this.lapStart = 0;
        this.lapCounter = 1;
    }

    checkLocalStorage() {
        if(localStorage.getItem('laps') && localStorage.getItem('time')) {
            let laps = JSON.parse(localStorage.getItem('laps'));
            this.time = JSON.parse(localStorage.getItem('time'));
            this.clock.innerHTML = this.formatTime(this.time);
            this.lapCounter = laps.length + 1;
            for(let i = 0; i < laps.length; i++) {
                this.laps.innerHTML += '<p class="text-xl m-2">Lap ' + (i+1) + ': ' + laps[i] + '</p>';
            }
        } else {
            this.setLocalStorage();
        }
    }

    startButtonClicked() {
        if(!this.started) {
            this.startTimer();
            this.setStartButtonColor('Pause');
        } else {
            this.pauseTimer();
            this.setStartButtonColor((this.paused) ? 'Start' : 'Pause');
        }
    }

    setStartButtonColor(state) {
        this.start.innerHTML = state;
        this.start.classList.remove((state === 'Start') ? "bg-orange-500" : "bg-green-500");
        this.start.classList.remove((state === 'Start') ? "hover:bg-orange-700" : "hover:bg-green-700");
        this.start.classList.add((state === 'Start') ? "bg-green-500" : "bg-orange-500");
        this.start.classList.add((state === 'Start') ? "hover:bg-green-700" : "hover:bg-orange-700");
    }

    startTimer() {
        let t = this;
        this.interval = setInterval(
            function() { 
                t.updateTime();
            }, this.intervalLength);
        this.started = !this.started;
    }

    updateTime() {
        if(!this.paused) {
            this.time += this.intervalLength;
            this.clock.innerHTML = this.formatTime(this.time);
            localStorage.setItem('time', JSON.stringify(this.time));
        }
    }

    pauseTimer() {
        this.paused = !this.paused;
    }

    lapButtonClicked() {
        let lapTime = this.time - this.lapStart;
        this.laps.innerHTML += '<p class="text-xl m-2">Lap ' + this.lapCounter + ': ' + this.formatTime(lapTime) + '</p>';
        this.lapStart = this.time;
        let laps = JSON.parse(localStorage.getItem('laps'));
        laps[laps.length] = this.formatTime(lapTime);
        localStorage.setItem('laps', JSON.stringify(laps));
        this.lapCounter++;
    }

    formatTime(value) {
        var seconds = value / 1000;
        var hours = parseInt( seconds / 3600 );
        seconds = seconds % 3600;
        var minutes = parseInt( seconds / 60 );
        seconds = seconds % 60;
        seconds = Math.round(seconds * 10) / 10;
        seconds = parseFloat(seconds).toFixed(1);
        if(minutes < 10) {
            minutes = '0' + minutes;
        }
        if(seconds < 10) {
            seconds = '0' + seconds;
        }
        if(hours < 10) {
            hours = '0' + hours;
        }
        return hours + ":" + minutes + ":" + seconds;
    }

    resetButtonClicked() {
        clearInterval(this.interval);
        clock.innerHTML = "00:00:00";
        laps.innerHTML = "";
        this.setLocalStorage();
        this.initialize();
    }

    setLocalStorage() {
        localStorage.setItem('time', 0);
        localStorage.setItem('laps', '[]');
    }
}