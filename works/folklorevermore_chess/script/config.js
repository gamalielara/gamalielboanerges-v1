let chessConfig = [
    ['bR', 'bN', 'bB', 'bQ', 'bK', 'bB', 'bN', 'bR'],
    ['bP', 'bP', 'bP', 'bP', 'bP', 'bP', 'bP', 'bP'],
    ['--', '--', '--', '--', '--', '--', '--', '--'],
    ['--', '--', '--', '--', '--', '--', '--', '--'],
    ['--', '--', '--', '--', '--', '--', '--', '--'],
    ['--', '--', '--', '--', '--', '--', '--', '--'],
    ['wP', 'wP', 'wP', 'wP', 'wP', 'wP', 'wP', 'wP'],
    ['wR', 'wN', 'wB', 'wQ', 'wK', 'wB', 'wN', 'wR']
];

const initialBoard = [
    ['bR', 'bN', 'bB', 'bQ', 'bK', 'bB', 'bN', 'bR'],
    ['bP', 'bP', 'bP', 'bP', 'bP', 'bP', 'bP', 'bP'],
    ['--', '--', '--', '--', '--', '--', '--', '--'],
    ['--', '--', '--', '--', '--', '--', '--', '--'],
    ['--', '--', '--', '--', '--', '--', '--', '--'],
    ['--', '--', '--', '--', '--', '--', '--', '--'],
    ['wP', 'wP', 'wP', 'wP', 'wP', 'wP', 'wP', 'wP'],
    ['wR', 'wN', 'wB', 'wQ', 'wK', 'wB', 'wN', 'wR']
];

const chessBoardNotation = [
    ['a8', 'b8', 'c8', 'd8', 'e8', 'f8', 'g8', 'h8'],
    ['a7', 'b7', 'c7', 'd7', 'e7', 'f7', 'g7', 'h7'],
    ['a6', 'b6', 'c6', 'd6', 'e6', 'f6', 'g6', 'h6'],
    ['a5', 'b5', 'c5', 'd5', 'e5', 'f5', 'g5', 'h5'],
    ['a4', 'b4', 'c4', 'd4', 'e4', 'f4', 'g4', 'h4'],
    ['a3', 'b3', 'c3', 'd3', 'e3', 'f3', 'g3', 'h3'],
    ['a2', 'b2', 'c2', 'd2', 'e2', 'f2', 'g2', 'h2'],
    ['a1', 'b1', 'c1', 'd1', 'e1', 'f1', 'g1', 'h1'],
];

for(i=0; i<8; i++){

    for(j=0; j<8; j++){
        
        const tile = document.getElementById(chessBoardNotation[i][j]);
        if(i==0 || i%2==0){
            if(j==0 || j%2==0){
                tile.classList.add('white');
            } else {
                tile.classList.add('gray');
            }
        } else {
            if(j%2 != 0){
                tile.classList.add('white');
            } else {
                tile.classList.add('gray');
            }
        }
    }

}

// drawing the entire chess board
function loadChessBoard(){
    // clearing all peaces on the board
    resetBoard();

    // checking for pawn to queen
    for(let k=0; k<8; k++){
        if(chessConfig[0][k] == 'wP'){
            chessConfig[0][k] = 'wQ';
        }
    }

    for(let k=0; k<8; k++){
        if(chessConfig[7][k] == 'bP'){
            chessConfig[7][k] = 'bQ';
        }
    }

    // drawing the pieces
    for(let i=0; i<8; i++){
        for(let j=0; j<8; j++){
            const tile = document.getElementById(chessBoardNotation[i][j]);
            const piece = document.createElement('img');
            const pieceDiv = document.createElement('div');
            if(chessConfig[i][j] != '--'){
                piece.setAttribute('src', 'assets/' + chessConfig[i][j] + '.png');
                pieceDiv.append(piece);
                pieceDiv.classList.add('piece', chessConfig[i][j], chessBoardNotation[i][j]);
                // classList = [piece, piece type, piece location]
                tile.append(pieceDiv);
            }    
        }
    }
}

function resetBoard(){
    for(let i=0; i<8; i++){
        for(let j=0; j<8; j++){
            const tile = document.getElementById(chessBoardNotation[i][j]);
            if(tile.hasChildNodes()){
                tile.childNodes[0].remove();
            }
        }
    }
}