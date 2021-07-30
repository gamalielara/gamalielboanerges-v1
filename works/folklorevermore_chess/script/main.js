let PLAYERCLICKS = []; /* 2-dimension array consist of 2 different square selected (id) */

loadChessBoard();
const tiles = document.querySelectorAll('.col');

const game = new Game();

tiles.forEach((tile) => {
    tile.addEventListener('click', () => {
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
                    console.log(document.getElementById(tile.id).childNodes);
                    // if the second click is ally
                    if((game.whiteToMove && document.getElementById(tile.id).childNodes[0].classList[1][0] === 'w') ||
                    (!game.whiteToMove && document.getElementById(tile.id).childNodes[0].classList[1][0] === 'b')){
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
    }); 
});

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