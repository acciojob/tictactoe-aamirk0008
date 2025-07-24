//your JS code here. If required.
let player1Name = '';
        let player2Name = '';
        let currentPlayer = 1;
        let gameBoard = ['', '', '', '', '', '', '', '', ''];
        let gameActive = true;

        const winningConditions = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];

        document.getElementById('submit').addEventListener('click', startGame);
        
        // Allow Enter key to start game
        document.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' && document.getElementById('setup-screen').style.display !== 'none') {
                startGame();
            }
        });

        function startGame() {
            player1Name = document.getElementById('player-1').value.trim();
            player2Name = document.getElementById('player-2').value.trim();

            if (player1Name === '' || player2Name === '') {
                alert('Please enter names for both players!');
                return;
            }

            document.getElementById('setup-screen').style.display = 'none';
            document.getElementById('game-screen').style.display = 'block';
            
            updateMessage();
            initializeBoard();
        }

        function initializeBoard() {
            const cells = document.querySelectorAll('.cell');
            cells.forEach(cell => {
                cell.addEventListener('click', handleCellClick);
                cell.textContent = '';
                cell.classList.remove('x', 'o');
            });
        }

        function handleCellClick(e) {
            const cellIndex = parseInt(e.target.id) - 1;

            if (gameBoard[cellIndex] !== '' || !gameActive) {
                return;
            }

            gameBoard[cellIndex] = currentPlayer === 1 ? 'X' : 'O';
            e.target.textContent = currentPlayer === 1 ? 'X' : 'O';
            e.target.classList.add(currentPlayer === 1 ? 'x' : 'o');

            if (checkWin()) {
                const winner = currentPlayer === 1 ? player1Name : player2Name;
                document.getElementById('message').innerHTML = `${winner} congratulations you won!`;
                document.getElementById('message').classList.add('winner');
                gameActive = false;
                return;
            }

            if (checkDraw()) {
                document.getElementById('message').innerHTML = `It's a draw!`;
                gameActive = false;
                return;
            }

            currentPlayer = currentPlayer === 1 ? 2 : 1;
            updateMessage();
        }

        function updateMessage() {
            const currentPlayerName = currentPlayer === 1 ? player1Name : player2Name;
            document.getElementById('message').innerHTML = `${currentPlayerName}, you're up`;
            document.getElementById('message').classList.remove('winner');
        }

        function checkWin() {
            return winningConditions.some(condition => {
                const [a, b, c] = condition;
                return gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c];
            });
        }

        function checkDraw() {
            return gameBoard.every(cell => cell !== '');
        }

        function resetGame() {
            gameBoard = ['', '', '', '', '', '', '', '', ''];
            currentPlayer = 1;
            gameActive = true;
            
            const cells = document.querySelectorAll('.cell');
            cells.forEach(cell => {
                cell.textContent = '';
                cell.classList.remove('x', 'o');
            });

            updateMessage();
        }