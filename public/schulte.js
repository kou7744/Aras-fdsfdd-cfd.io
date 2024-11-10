class SchulteGame {
    constructor() {
        this.currentNumber = 1;
        this.maxNumber = 25;
        this.startTime = null;
        this.timerInterval = null;
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
        this.startTime = new Date();
        this.timerInterval = setInterval(() => this.updateTimer(), 100);
    }

    updateTimer() {
        const currentTime = new Date();
        const elapsedTime = (currentTime - this.startTime) / 1000;
        document.getElementById('timer').textContent = `Час: ${elapsedTime.toFixed(1)} с`;
    }

    endGame() {
        clearInterval(this.timerInterval);
        setTimeout(() => {
            alert('Вітаємо! Ви завершили вправу!');
        }, 100);
    }

    newGame() {
        clearInterval(this.timerInterval);
        this.currentNumber = 1;
        document.getElementById('timer').textContent = 'Час: 0.0 с';
        this.createTable();
    }
}

const game = new SchulteGame();