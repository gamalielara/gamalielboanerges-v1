let PLAYERCLICKS = []; /* 2-dimension array consist of 2 different square selected (id) */


const game = new Game();
loadChessBoard();

const dialogBox = document.querySelectorAll('.dialog-box');
dialogBox.forEach((dialogbox) => {
    dialogbox.style.opacity = '0';
    dialogbox.style.transform = 'translate(-50%, 50%)'
});
const fullDialog = document.querySelectorAll('.alert-full-page');
fullDialog.forEach((fulldialog) => fulldialog.style.display = 'none');
const closeDialog = document.querySelectorAll('.buttons > #close-dialog');

const resetButton = document.querySelectorAll('#reset-game');

const resetGameOverButton = document.querySelectorAll('.reset-game-over');

const undoButton = document.getElementById('undo-move');

setTimeout(() => showDialogBox('.player-info'), 500);

if(closeDialog !== null){
    closeDialog.forEach((closeButton) => {
        closeButton.addEventListener('click', (event) =>{
            document.querySelectorAll('.dialog-box').forEach((dialogbox) => {
                dialogbox.style.transform = 'translate(-50%, 50%)';
                dialogbox.style.opacity = '0';
            });
            setTimeout(() => {
                fullDialog.forEach((fulldialog) => fulldialog.style.display = 'none');
            }, 300);
        });
    })
}

if(resetGameOverButton !== null){
    resetGameOverButton.forEach((gameOverButton) => {
        gameOverButton.addEventListener('click', (event) =>{
            document.querySelectorAll('.dialog-box').forEach((dialogbox) => {
                dialogbox.style.transform = 'translate(-50%, 50%)';
                dialogbox.style.opacity = '0';
            });
            setTimeout(() => {
                fullDialog.forEach((fulldialog) => fulldialog.style.display = 'none');
            }, 300);
        });
    })
}


const chesstiles = document.querySelectorAll('.col');
chesstiles.forEach((tile) => {
    tile.addEventListener('click', () => {
        if(game.whiteToMove){
            if(game.checkMate){
                showDialogBox('.player-gameover');
            }
            if(PLAYERCLICKS.length === 0){
                removeHighlights();
                tile.classList.add('piece-clicked');
                PLAYERCLICKS.push(tile.id);
                const r = chessNotationToIndex(tile.id)[0];
                const c = chessNotationToIndex(tile.id)[1];
                createHighlight(r, c);
            } else if (PLAYERCLICKS.length === 1){
                if(PLAYERCLICKS[0] === tile.id){
                    removeHighlights();
                    tile.classList.remove('piece-clicked');
                    PLAYERCLICKS = [];
                } else {
                    removeHighlights();
                    tile.classList.add('piece-clicked');
                    const r = chessNotationToIndex(tile.id)[0];
                    const c = chessNotationToIndex(tile.id)[1];
                    createHighlight(r, c);
                    if(document.getElementById(tile.id).hasChildNodes()){
                            // if the second click is ally
                        if((game.whiteToMove && document.getElementById(tile.id).childNodes[0].classList[1][0] === 'w')){
                            PLAYERCLICKS = [tile.id];
                            // reset PLAYERCLICKS length to 1 with the tile.id as the sole 
                        } else {
                            PLAYERCLICKS.push(tile.id);
                        }
                    } else {
                        PLAYERCLICKS.push(tile.id);
                    }
                } 
            }
            if(PLAYERCLICKS.length === 2){
                let sq1 = chessNotationToIndex(PLAYERCLICKS[0]);
                let sq2 = chessNotationToIndex(PLAYERCLICKS[1]);
                // creating a Move object
                let move = new Move(sq1, sq2, chessConfig);
                PLAYERCLICKS = [];
                const validMoves = game.getValidMoves();
                validMoves.forEach((validMove) => {
                    if(validMove.rowStart == move.rowStart && validMove.colStart == move.colStart &&
                        validMove.rowEnd == move.rowEnd && validMove.colEnd == move.colEnd){
                        game.makeMove(move);
                    }
                });
            }
        }
    });
});

function computerMove(){
    setTimeout(() => {
        const computerValidMoves = game.getValidMoves();
        if(computerValidMoves.length > 0){
            const computerMove = game.getComputerMove(computerValidMoves);
            game.makeMove(computerMove);
        } else {
            game.checkMate = false;
            showDialogBox('.player-gameover');
        }
    }, 1000);
}


resetButton.forEach((reset) => reset.addEventListener('click', () => {
    if(game.moveLong.length > 0){
        game.whiteToMove = true;
        game.moveLong = [];
        resetBoard();
    }
}));

undoButton.addEventListener('click', () => game.undoMove())

function showDialogBox(dialogclass){
    fullDialog.forEach((fulldialog) => fulldialog.style.display = 'block');
    const dialogBox = document.querySelector(dialogclass);
    if(dialogBox !== null){
        setTimeout(() => {
            dialogBox.style.opacity = '1';
            dialogBox.style.transform = 'translate(-50%, -50%)';
        });
    }
}

function chessNotationToIndex(notation){
    for(let i=0; i<8; i++){
        for(let j=0; j<8; j++){
            if(chessBoardNotation[i][j] === notation){
                return [i, j];
            }
        }
    }
}

function indexTochessNotation(i, j){
    return chessBoardNotation[i][j];
}

function createHighlight(r, c){
    const validMoves = game.getValidMoves();
    let enemy;
    if(game.whiteToMove){
       enemy = 'b'; 
    } else {
        enemy = 'w';
    }
    validMoves.forEach((validMove) => {
        if(r == validMove.rowStart && c == validMove.colStart){
            const tileID = indexTochessNotation(validMove.rowEnd, validMove.colEnd);
            const theTile = document.getElementById(tileID);
            const highlightedDiv = document.createElement('div');
            if(chessConfig[validMove.rowEnd][validMove.colEnd] === '--'){
                highlightedDiv.classList.add('highlight');
                theTile.append(highlightedDiv);
            } else if (chessConfig[validMove.rowEnd][validMove.colEnd][0] === enemy){
                theTile.classList.add('enemy-highlight');
            }
        }
    });
}

function removeHighlights(){
    // remove the highlight of the clicked piece
    document.querySelectorAll('.piece-clicked').forEach((tile) => tile.classList.remove('piece-clicked'));

    // checking for if there are tiles highlighted
    const highlightedTiles = document.querySelectorAll('.highlight');
    if(highlightedTiles !== null){
        highlightedTiles.forEach((tile) => tile.remove('highlight'));
    }

    const enemyHighlighted = document.querySelectorAll('.enemy-highlight');
    if(enemyHighlighted !== null){
        enemyHighlighted.forEach((enemy) => enemy.classList.remove('enemy-highlight'));
    }
}