const cells = document.querySelectorAll('.cell');
const resetBtn = document.getElementById('reset-btn');
let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];

function handleClick(index) {
    if (gameBoard[index] !== '') return;

    gameBoard[index] = currentPlayer;
    cells[index].textContent = currentPlayer;

    if (checkWinner()) {
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function checkWinner() {
    const winPatterns = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (let pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            // Highlight the winning cells
            cells[a].classList.add('winner');
            cells[b].classList.add('winner');
            cells[c].classList.add('winner');
            drawLine(pattern);
            alert(`${currentPlayer} wins!`);
            return true;
        }
    }

    return false;
}

function drawLine(pattern) {
    const [a, b, c] = pattern;
    const line = document.createElement('div');
    line.classList.add('win-line');

    const rectA = cells[a].getBoundingClientRect();
    const rectB = cells[b].getBoundingClientRect();
    const rectC = cells[c].getBoundingClientRect();

    // Calculate the center points of the winning cells
    const startX = (rectA.left + rectB.left + rectC.left) / 3;
    const startY = (rectA.top + rectB.top + rectC.top) / 3;
    const endX = (rectA.left + rectB.left + rectC.left) / 3;
    const endY = (rectA.top + rectB.top + rectC.top) / 3;

    // Adjust the line's size and position to cover the winning cells
    line.style.width = '0%';
    line.style.height = '5px';
    line.style.backgroundColor = 'red';
    line.style.position = 'absolute';
    line.style.top = `${startY + 10}px`; // Adjust position to draw the line above the cells
    line.style.left = `${startX + 10}px`; // Adjust to center the line across the cells

    document.body.appendChild(line);
}

function resetGame() {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('winner');
    });
    currentPlayer = 'X';
}

cells.forEach((cell, index) => {
    cell.addEventListener('click', () => handleClick(index));
});

resetBtn.addEventListener('click', resetGame);
