class SchulteGame {
    constructor() {
        this.currentNumber = 1;
        this.maxNumber = 25;
        this.startTime = null;
        this.timerInterval = null;
        this.bestTime = localStorage.getItem('bestTime') || Infinity;
        
        this.init();
    }

    init() {
        this.createTable();
        this.setupEventListeners();
    }

    createTable() {
        const numbers = Array.from({length: this.maxNumber}, (_, i) => i + 1);
        this.shuffleArray(numbers);
        
        const table = document.getElementById('schulte-table');
        table.innerHTML = '';
        
        numbers.forEach(number => {
            const cell = document.createElement('div');
            cell.className = 'cell';
            cell.dataset.number = number;
            cell.textContent = number;
            table.appendChild(cell);
        });
    }

    shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    setupEventListeners() {
        document.getElementById('schulte-table').addEventListener('click', (e) => {
            if (e.target.classList.contains('cell')) {
                this.handleCellClick(e.target);
            }
        });

        document.getElementById('newGameBtn').addEventListener('click', () => {
            this.newGame();
        });
    }

    handleCellClick(cell) {
        const number = parseInt(cell.dataset.number);
        if (number === this.currentNumber) {
            if (this.currentNumber === 1) {
                this.startTimer();
            }
            cell.classList.add('correct');
            this.currentNumber++;
            
            if (this.currentNumber > this.maxNumber) {
                this.endGame();
            }
        }
    }

    startTimer() {
        this.startTime = Date.now();
        this.timerInterval = setInterval(() => this.updateTimer(), 100);
    }

    updateTimer() {
        const elapsedTime = (Date.now() - this.startTime) / 1000;
        document.getElementById('timer').textContent = `Час: ${elapsedTime.toFixed(1)} с`;
    }

    endGame() {
        clearInterval(this.timerInterval);
        const finalTime = (Date.now() - this.startTime) / 1000;
        
        if (finalTime < this.bestTime) {
            this.bestTime = finalTime;
            localStorage.setItem('bestTime', finalTime);
            alert(`Новий рекорд! Ваш час: ${finalTime.toFixed(1)} секунд!`);
        } else {
            alert(`Вітаємо! Ваш час: ${finalTime.toFixed(1)} секунд!\nНайкращий час: ${this.bestTime.toFixed(1)} секунд`);
        }
    }

    newGame() {
        clearInterval(this.timerInterval);
        this.currentNumber = 1;
        document.getElementById('timer').textContent = 'Час: 0.0 с';
        this.createTable();
    }
}

const game = new SchulteGame();