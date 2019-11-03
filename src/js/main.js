import { Timer } from '../../src/js/Timer.js';

(function(){
    
    let startButton = document.getElementById('start');
    let lapButton = document.getElementById('lap');
    let resetButton = document.getElementById('reset');

    let clock = document.getElementById('clock');
    let laps = document.getElementById('laps');

    let timer = new Timer(clock, startButton, laps);

    startButton.addEventListener('click', function(e) {
        timer.startButtonClicked();
    });

    lapButton.addEventListener('click', function(e) {
        timer.lapButtonClicked();
    });

    resetButton.addEventListener('click', function(e) {
        timer.resetButtonClicked();
    });

})();