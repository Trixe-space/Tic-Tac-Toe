let CurrentPlayer = 'X';
let GameFinished = false;
const CurrentPlayerVisual = document.querySelector('#current-player');

let Board = ['', '', '', '', '', '', '', '', ''];
const WinConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

CurrentPlayerVisual.innerText = CurrentPlayer;
CurrentPlayerVisual.style.color = `#007BFF`;

let PlayerSwitcher = () => {
    CurrentPlayer = CurrentPlayer == 'X' ? 'O' : 'X';
    CurrentPlayerVisual.innerText = CurrentPlayer;
    CurrentPlayerVisual.style.color = CurrentPlayer == 'X' ? `#007BFF` : `#FF2C2C`;
};

const Button = document.querySelectorAll('.button');

// Half the function below is stolen but all the ugly parts were written by me.
let WinChecker = () => {
    for (let BoardIndex = 0; BoardIndex < 8; BoardIndex++) {
        let CellCheckOne = Board[WinConditions[BoardIndex][0]];
        let CellCheckTwo = Board[WinConditions[BoardIndex][1]];
        let CellCheckThree = Board[WinConditions[BoardIndex][2]];

        if (CellCheckOne == '' || CellCheckTwo == '' || CellCheckThree == '') {
            continue;
        }
        else if (CellCheckOne == CellCheckTwo && CellCheckTwo == CellCheckThree) {
            Button.forEach(ButtonChild => {
                ButtonChild.disabled = true;
            });
            for (let Iteration = 0; Iteration < 3; Iteration++) {
                Button[WinConditions[BoardIndex][Iteration]].style =
                    `color: #04E762; 
                    background-color: #061A40; 
                    border: 2px solid #04E762;`;
            }
            const WinningPlayerHTML = CurrentPlayer == 'X' ?
                `<span style="color: #007BFF;">${CurrentPlayer}</span>` :
                `<span style="color: #FF2C2C;">${CurrentPlayer}</span>`;
            document.querySelector('#info-text').innerHTML = `Player ${WinningPlayerHTML} has won the game.`;
            GameFinished = true;
            break;
        }
    }

    if (!Board.includes('')) {
    }
};



for (let ButtonIndex = 0; ButtonIndex < 9; ButtonIndex++) {
    Button[ButtonIndex].addEventListener('click', () => {
        Button[ButtonIndex].style = CurrentPlayer == 'X' ?
            `color: #007BFF;
            background-color: #061A40;
            border: 2px solid #007BFF` :
            `color: #FF2C2C;
            background-color: #061A40;
            border: 2px solid #FF2C2C`;
        Button[ButtonIndex].innerText = CurrentPlayer;
        Button[ButtonIndex].disabled = true;

        Board[ButtonIndex] = CurrentPlayer;

        WinChecker();
        PlayerSwitcher();
    });
}