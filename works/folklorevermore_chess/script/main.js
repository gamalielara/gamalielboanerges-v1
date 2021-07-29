let pieceClicked = [];
let whiteToMove = true;
const whiteToMoveFlag = document.querySelector('.turn');
let chessHistory = [];
const undoButton = document.getElementById('undo-move');
const resetButton = document.getElementById('reset-game');

window.addEventListener('load', function(){
    getAllPossibleMoves();
});

undoButton.addEventListener('click', () => undoMove())
resetButton.addEventListener('click', () => {
    chessConfig = initialBoard.map(i => i.map(j => j));
    whiteToMove = true;
    getAllPossibleMoves();
});


function getAllPossibleMoves(){
    loadChessBoard();
    // getKingPosition();

    const pieces = document.querySelectorAll('.piece');

    // removing the clicked piece and enemy to capture
    for(const tile of document.querySelectorAll('.enemy-to-capture')){
        tile.classList.remove('enemy-to-capture');
    }

    if(whiteToMove){
        whiteToMoveFlag.innerText = 'White';
    } else {
        whiteToMoveFlag.innerText = 'Black';
    }
    
    for(const piece of pieces){
        if((piece.classList[1][0] == 'w' && whiteToMove) || (piece.classList[1][0] == 'b' && !whiteToMove)){

            if(!(piece.classList.contains('piece'))){
                piece.classList.add('piece')
            }

            piece.addEventListener('click', function(event){
                if(pieceClicked.length == 0){
                    event.target.parentElement.classList.add('piece-clicked');
                    const move = {
                        pieceType: piece.classList[1],
                        location: piece.classList[2]
                    };
                    pieceClicked.push(move);
                    generatePossibleMoves(piece);
                } else if(pieceClicked.length == 1){
                    if(pieceClicked[0].location == piece.classList[2]){
                        // if a piece is clicked twice
                        pieceClicked = [];
                        getAllPossibleMoves();
                        // const clickedPiece = document.querySelector('.piece-clicked');

                        // if(clickedPiece != null){
                        //     clickedPiece.classList.remove('piece-clicked');
                        // }

                        // for(const tile of document.querySelectorAll('.possible-move')){
                        //     tile.remove();
                        // }

                        // for(const tile of document.querySelectorAll('.enemy-to-capture')){
                        //     tile.classList.remove('enemy-to-capture');
                        // }

                        // pieceClicked = [];
                    } else {
                        // clearing the selected piece and reset pieceClicked
                        // const clickedPiece = document.querySelector('.piece-clicked');
                        // if(clickedPiece != null){
                        //     clickedPiece.classList.remove('piece-clicked');
                        // }
                        // for(const tile of document.querySelectorAll('.possible-move')){
                        //     tile.remove();
                        // }
                        // for(const tile of document.querySelectorAll('.enemy-to-capture')){
                        //     tile.classList.remove('enemy-to-capture');
                        // }
                        // pieceClicked = [];

                        // RESETING (PROBATION)
                        pieceClicked = [];
                        getAllPossibleMoves();

                        // adding the new piece selected 
                        // const move = {
                        //     pieceType: piece.classList[1],
                        //     location: piece.classList[2]
                        // };
                        // event.target.parentElement.classList.add('piece-clicked');
                        // pieceClicked.push(move);
                        // console.log( event.target.parentElement);
                        // generatePossibleMoves(piece);
                    }
                }
            });
        } else {
            piece.classList.remove('piece');
        }
    }
}

function generatePossibleMoves(selectedPiece){
    // code here
    const pieceType = selectedPiece.classList[1][1];
    const startRow = getPositionIndex(selectedPiece)[0];
    const startCol = getPositionIndex(selectedPiece)[1];

    if(pieceType == 'P'){
        getPawnMoves(startRow, startCol);
    } else if(pieceType == 'R'){
        getRookMoves(startRow, startCol);
    } else if(pieceType == 'N'){
        getKnightMoves(startRow, startCol);
    } else if(pieceType == 'B'){
        getBishopMoves(startRow, startCol);
    } else if(pieceType == 'Q'){
        getQueenMoves(startRow, startCol);
    } else if(pieceType == 'K'){
        getKingMoves(startRow, startCol);
    }
}

function getPositionIndex(piece){
    const position = piece.classList[2];
    for (let i=0; i<8; i++){
        for(let j=0; j<8; j++){
            if(chessBoardNotation[i][j] == position){
                return [i, j];
            }
        }
    }
}

function addMove(pieceType, startRow, startCol, endRow, endCol){
    // const allowedMove = getValidMoves();
    // for(const move of allowedMove){
        // if(startRow == move.startR && startCol == move.startC && endRow == move.endR && endCol == move.endC){
            // the move is allowed 
            const possibleMove = document.getElementById(chessBoardNotation[endRow][endCol]);
            const possibleEnemy = possibleMove.childNodes[0];
            const highlightTile = document.createElement('div');
            highlightTile.classList.add('possible-move');

            if(possibleMove !== null){
                if(chessConfig[endRow][endCol] == '--'){
                    possibleMove.append(highlightTile);
                } else if ((whiteToMove && chessConfig[endRow][endCol][0] =='b') || (!whiteToMove && chessConfig[endRow][endCol][0] =='w')){
                    possibleEnemy.classList.add('enemy-to-capture');
                }
            }

            highlightTile.addEventListener('click', function(){
                makeMove(pieceType, startRow, startCol, endRow, endCol);
            });

            const enemyToCapture = document.querySelector('.enemy-to-capture');
            console.log(enemyToCapture);

            if(enemyToCapture !== null){
                enemyToCapture.addEventListener('click', function(event){
                    makeMove(pieceType, startRow, startCol, endRow, endCol);
                    event.target.parentElement.remove()
                });
            }
}
//     }
// }

function makeMove(movedPiece, startRow, startCol, endRow, endCol){
    const previousMove = {
        board : chessConfig.map(i => i.map(j => j)),
        isWhitetoMove : whiteToMove
    }

    chessHistory.push(previousMove);

    chessConfig[startRow][startCol] = '--';
    chessConfig[endRow][endCol] = movedPiece;
    moveMadeChecker();
}

function moveMadeChecker(){
    const highlightTile = document.querySelectorAll('.possible-move');
    for(const tile of highlightTile){
        tile.remove();
    }

    pieceClicked = [];
    whiteToMove = !whiteToMove;
    getAllPossibleMoves();
}

function undoMove(){
    const previousMove = chessHistory[chessHistory.length - 1];
    chessConfig = previousMove.board;
    whiteToMove = previousMove.isWhitetoMove;
    pieceClicked = [];
    chessHistory.pop();
    getAllPossibleMoves();
}

function getPawnMoves(startRow, startCol){
    if(whiteToMove){
        if(startRow == 6){
            if(chessConfig[startRow-1][startCol] == '--'){
                addMove('wP', startRow, startCol, startRow-1, startCol);
            }
            if(chessConfig[startRow-2][startCol] == '--'){
                addMove('wP', startRow, startCol, startRow-2, startCol);
            }
            if(startCol < 7 && startCol >= 0){
                if(chessConfig[startRow-1][startCol+1][0] == 'b'){
                    addMove('wP', startRow, startCol, startRow-1, startCol+1);
                }
            }
            if(startCol <= 7 && startCol > 0){
                if(chessConfig[startRow-1][startCol-1][0] == 'b'){
                    addMove('wP', startRow, startCol, startRow-1, startCol-1);
                }
            }
        } else {
            if(startRow > 0){
                if(chessConfig[startRow-1][startCol] == '--'){
                    addMove('wP', startRow, startCol, startRow-1, startCol);
                }
            }
            if(startCol < 7 && startCol >= 0){
                if(chessConfig[startRow-1][startCol+1][0] == 'b'){
                    addMove('wP', startRow, startCol, startRow-1, startCol+1);
                }
            }
            if(startCol <= 7 && startCol > 0){
                if(chessConfig[startRow-1][startCol-1][0] == 'b'){
                    addMove('wP', startRow, startCol, startRow-1, startCol-1)
                }
            }
        }
    } else {
        if(startRow == 1){
            if(chessConfig[startRow+1][startCol] == '--'){
                addMove('bP', startRow, startCol, startRow+1, startCol);
            }
            if(chessConfig[startRow+2][startCol] == '--'){
                addMove('bP', startRow, startCol, startRow+2, startCol);
            }
            if(startCol < 7 && startCol >= 0){
                if(chessConfig[startRow+1][startCol+1][0] == 'w'){
                    addMove('bP', startRow, startCol, startRow+1, startCol+1);
                }
            }
            if(startCol <= 7 && startCol > 0){
                if(chessConfig[startRow+1][startCol-1][0] == 'w'){
                    addMove('bP', startRow, startCol, startRow+1, startCol-1);
                }
            }
        } else{
            if(startRow < 7){
                if(chessConfig[startRow+1][startCol] == '--'){
                    addMove('bP', startRow, startCol, startRow+1, startCol);
                }
            }
            if(startCol < 7 && startCol >= 0){
                if(chessConfig[startRow+1][startCol+1][0] == 'w'){
                    addMove('bP', startRow, startCol, startRow+1, startCol+1);
                }
            }
            if(startCol <= 7 && startCol > 0){
                if(chessConfig[startRow+1][startCol-1][0] == 'w'){
                    addMove('bP', startRow, startCol, startRow+1, startCol-1)
                }
            }
        }
    }
}

function getRookMoves(startRow, startCol){
    const iter = [[1, 0], [-1, 0], [0, 1], [0, -1]];

    for (let i=0; i<iter.length; i++){
        let rowNext = startRow;
        let colNext = startCol;

        for(let j=0; j<8; j++){
            rowNext += iter[i][0];
            colNext += iter[i][1];

            if((rowNext>-1 && rowNext<8) && (colNext>-1 && colNext<8)){
                if(whiteToMove){
                    if(chessConfig[rowNext][colNext] === '--'){
                        addMove('wR', startRow, startCol, rowNext, colNext);
                    } else if(chessConfig[rowNext][colNext][0] === 'b'){
                        addMove('wR', startRow, startCol, rowNext, colNext);
                        break;
                    } else if(chessConfig[rowNext][colNext][0] === 'w'){
                        break;
                    }
                } else {
                    if(chessConfig[rowNext][colNext] === '--'){
                        addMove('bR', startRow, startCol, rowNext, colNext);
                    } else if(chessConfig[rowNext][colNext][0] === 'w'){
                        addMove('bR', startRow, startCol, rowNext, colNext);
                        break;
                    } else if(chessConfig[rowNext][colNext][0] === 'b'){
                        break;
                    } 
                }
            }
        }
    }
}

function getBishopMoves(startRow, startCol){
    const iter = [[1, 1], [1, -1], [-1, 1], [-1, -1]];

    for (let i=0; i<iter.length; i++){
        let rowNext = startRow;
        let colNext = startCol;

        for (let j=0; j<8; j++){
            rowNext += iter[i][0];
            colNext += iter[i][1];

            if((rowNext>-1 && rowNext<8) && (colNext>-1 && colNext<8)){
                if(whiteToMove){
                    if((chessConfig[rowNext][colNext] === '--')){
                        addMove('wB', startRow, startCol, rowNext, colNext);
                    } else if(chessConfig[rowNext][colNext][0] === 'b') {
                        addMove('wB', startRow, startCol, rowNext, colNext);
                        break;
                    }
                    else if(chessConfig[rowNext][colNext][0] === 'w') {
                        break;
                    }
                } else {
                    if(chessConfig[rowNext][colNext] === '--'){
                        addMove('bB', startRow, startCol, rowNext, colNext);
                    } else if(chessConfig[rowNext][colNext][0] === 'w') {
                        addMove('bB', startRow, startCol, rowNext, colNext);
                        break;
                    }
                    else if(chessConfig[rowNext][colNext][0] === 'b') {
                        break;
                    }
                }
            }
        }
    }
}

function getKnightMoves(startRow, startCol){
    const iter = [[1,2], [1, -2], [2, 1], [2, -1], [-1, 2], [-1, -2], [-2, 1], [-2, -1]];

    for(let i=0; i<iter.length; i++){
            const rowEnd = startRow + iter[i][0];
            const colEnd = startCol + iter[i][1];

        if((rowEnd > -1 && rowEnd < 8) && (colEnd > -1 && colEnd < 8)){
            if(whiteToMove){
                addMove('wN', startRow, startCol, rowEnd, colEnd);
            } else {
                addMove('bN', startRow, startCol, rowEnd, colEnd);
            } 
        }
    }
}

function getQueenMoves(startRow, startCol){
    const iter = [[1, 0], [-1, 0], [0, 1], [0, -1], [-1, 1], [-1, -1], [1, 1], [1, -1]];

    for (let i=0; i<iter.length; i++){
        let rowNext = startRow;
        let colNext = startCol;

        for(let j=0; j<8; j++){
            rowNext += iter[i][0];
            colNext += iter[i][1];

            if ((rowNext > -1 && rowNext < 8) && (colNext > -1 && colNext < 8)){
                if(whiteToMove){
                    if(chessConfig[rowNext][colNext] === '--'){
                        addMove('wQ', startRow, startCol, rowNext, colNext);
                    } else if (chessConfig[rowNext][colNext][0] === 'b'){
                        addMove('wQ', startRow, startCol, rowNext, colNext);
                        break;
                    } else if (chessConfig[rowNext][colNext][0] === 'w'){
                        break;
                    }
                } else {
                    if(chessConfig[rowNext][colNext] === '--'){
                        addMove('bQ', startRow, startCol, rowNext, colNext);
                    } else if (chessConfig[rowNext][colNext][0] === 'w'){
                        addMove('bQ', startRow, startCol, rowNext, colNext);
                        break;
                    } else if (chessConfig[rowNext][colNext][0] === 'b'){
                        break;
                    }
                }
            }
        }
    }
}

function getKingMoves(startRow, startCol){
    const iter = [[1, 0], [-1, 0], [0, 1], [0, -1], [1, -1], [1, 1], [-1, 1], [-1, -1]];

    for(let i=0; i<iter.length; i++){
        const rowNext = startRow + iter[i][0];
        const colNext = startCol + iter[i][1];

        if((rowNext > -1 && rowNext < 8) && (colNext > -1 && colNext < 8)){
            if(whiteToMove){
                addMove('wK', startRow, startCol, rowNext, colNext);
            } else {
                addMove('bK', startRow, startCol, rowNext, colNext);
            } 
        }
    }
}