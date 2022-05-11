const Gameboard = (() => {
    let gameboard = ['', '', '', '', '', '', '', '', ''];
    

    function updateBoard() {
        for ( i=0; i < Gameboard.gameboard.length; i++) {
            const square = document.getElementById('square'+(i+1));
            square.innerHTML = Gameboard.gameboard[i];
            
        }
    };

    function addCounter(e) {
        clickedSquare = parseInt(e.target.id.slice(-1))
        arrayNumber =  clickedSquare-1;
        if (Gameboard.gameboard[arrayNumber] == '') {
            Gameboard.gameboard[arrayNumber] = currentPlayer.counter;
            e.target.style.color = currentPlayer.color;
            updateBoard()

            if (Game.checkWin()) {
                winSection.style.display='flex';
                winMessage.innerHTML = `${currentPlayer.name} Won!`
            } else if (Game.checkDraw()) {
                winSection.style.display='flex';
                winMessage.innerHTML = 'Draw!'
            } else {
                Game.switchPlayer()
            }

        }
    };

    function resetGameboard() {
        Gameboard.gameboard = ['', '', '', '', '', '', '', '', ''];
        updateBoard();
    }

    return {
        gameboard,
        resetGameboard,
        addCounter
    };
})();

const Player = (name, counter, color) => {
    return {
        name,
        counter,
        color
    }
}

const Game = (() => {
    const playerBox = document.getElementById('player-turn');
    
    const winningPattern = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
        [1, 4, 7],
        [2, 5, 8],
        [3, 6, 9],
        [1, 5, 9],
        [3, 5, 7],
    ];

    function startGame() {
        playerBox.innerHTML = currentPlayer.name + '\'s Turn. Start the game!';
        Gameboard.resetGameboard();
        
        
    };

    function checkDraw() {
        return [...boxes].every(cell => {
            return cell.innerHTML != '';
        })
    }

    function checkWin() {
        return winningPattern.some(arr => {
            const result1 = Gameboard.gameboard[(arr[0]-1)];
            const result2 = Gameboard.gameboard[(arr[1]-1)];
            const result3 = Gameboard.gameboard[(arr[2]-1)];
            if (result1 != '' && result1 == result2 && result1 == result3) {
                return true;
            }
        })
    }

    function switchPlayer() {
        if (currentPlayer == player1 ?
            currentPlayer = player2 :
            currentPlayer = player1
        );
        playerBox.innerHTML = currentPlayer.name + '\'s Turn';
    }

    return {
        startGame,
        checkWin,
        checkDraw,
        switchPlayer
    }
})();

const winSection = document.getElementById('game-over');
const winMessage = document.getElementById('winning-text');
const restartButton = document.getElementById('restart');

const boxes = document.querySelectorAll('.box');
boxes.forEach(box => {
    box.addEventListener('click', (e) => {
        Gameboard.addCounter(e);
    });
});

const player1 = Player('Rachel', 'X', '#E887D4');
const player2 = Player('Jack', 'O', '#7FACD6');
let currentPlayer = player1;

restartButton.addEventListener('click', click => {
    winSection.style.display='none';
    Game.startGame();
})

Game.startGame();



