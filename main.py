import sys
import random
from PyQt5.QtWidgets import (QApplication, QMainWindow, QWidget, QGridLayout,
                           QPushButton, QVBoxLayout, QLabel)
from PyQt5.QtCore import QTimer, Qt
from PyQt5.QtGui import QFont

class SchulteTable(QMainWindow):
    def __init__(self):
        super().__init__()
        self.setWindowTitle('Тренажер таблиці Шульте')
        self.setFixedSize(600, 700)

        # Initialize variables
        self.current_number = 1
        self.max_number = 25
        self.timer = QTimer()
        self.time = 0.0
        self.timer.timeout.connect(self.update_timer)
        
        # Create central widget and layout
        central_widget = QWidget()
        self.setCentralWidget(central_widget)
        layout = QVBoxLayout(central_widget)
        
        # Create timer label
        self.timer_label = QLabel('Час: 0.0 с')
        self.timer_label.setAlignment(Qt.AlignCenter)
        self.timer_label.setFont(QFont('Arial', 24))
        layout.addWidget(self.timer_label)
        
        # Create grid for Schulte table
        self.grid_layout = QGridLayout()
        self.create_table()
        layout.addLayout(self.grid_layout)
        
        # Create new game button
        new_game_btn = QPushButton('Нова таблиця')
        new_game_btn.setFont(QFont('Arial', 14))
        new_game_btn.setStyleSheet("""
            QPushButton {
                background-color: #4CAF50;
                color: white;
                border: none;
                padding: 10px 20px;
                border-radius: 4px;
            }
            QPushButton:hover {
                background-color: #45a049;
            }
        """)
        new_game_btn.clicked.connect(self.new_game)
        layout.addWidget(new_game_btn)

    def create_table(self):
        # Clear existing grid
        while self.grid_layout.count():
            item = self.grid_layout.takeAt(0)
            if item.widget():
                item.widget().deleteLater()

        # Generate numbers and shuffle
        numbers = list(range(1, self.max_number + 1))
        random.shuffle(numbers)

        # Create buttons
        size = int(self.max_number ** 0.5)
        for i in range(size):
            for j in range(size):
                number = numbers[i * size + j]
                button = QPushButton(str(number))
                button.setFixedSize(100, 100)
                button.setFont(QFont('Arial', 20))
                button.setStyleSheet("""
                    QPushButton {
                        background-color: white;
                        border: 1px solid #ddd;
                    }
                    QPushButton:hover {
                        background-color: #f5f5f5;
                    }
                """)
                button.clicked.connect(self.handle_click)
                self.grid_layout.addWidget(button, i, j)

    def handle_click(self):
        button = self.sender()
        number = int(button.text())
        
        if number == self.current_number:
            if self.current_number == 1:
                self.timer.start(100)  # Start timer at first correct click
            
            button.setStyleSheet("""
                QPushButton {
                    background-color: #90EE90;
                    border: 1px solid #ddd;
                }
            """)
            self.current_number += 1
            
            if self.current_number > self.max_number:
                self.timer.stop()
                from PyQt5.QtWidgets import QMessageBox
                QMessageBox.information(self, 'Вітаємо!', 
                    f'Ви завершили вправу за {self.time:.1f} секунд!')

    def update_timer(self):
        self.time += 0.1
        self.timer_label.setText(f'Час: {self.time:.1f} с')

    def new_game(self):
        self.current_number = 1
        self.time = 0.0
        self.timer.stop()
        self.timer_label.setText('Час: 0.0 с')
        self.create_table()

if __name__ == '__main__':
    app = QApplication(sys.argv)
    window = SchulteTable()
    window.show()
    sys.exit(app.exec_())