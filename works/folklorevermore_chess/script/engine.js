class Move {
    constructor(sqStart, sqEnd, board){
        this.rowStart = sqStart[0],
        this.colStart = sqStart[1],
        this.rowEnd = sqEnd[0],
        this.colEnd = sqEnd[1],
        this.board = board
    }
    
    getMovedPiece(){
        return this.board[this.rowStart][this.colStart];
    }

    getCapturedPiece(){
        const enemy = this.board[this.rowEnd][this.colEnd];
        if(enemy !== '--'){
            return enemy;
        }
        return null;
    }
}

class Game {
    constructor(){
        this.whiteToMove = true;
    }

    makeMove(move){
        const startRow = move.rowStart;
        const startCol = move.colStart;
        const endRow = move.rowEnd;
        const endCol = move.colEnd;
        const movedPiece = move.getMovedPiece();

        move.board[startRow][startCol] = '--';
        move.board[endRow][endCol] = movedPiece;
        this.whiteToMove = !this.whiteToMove;
        loadChessBoard();
    }

    getValidMoves(){
        /* 
        to check checkmate:
        1. get all the possible moves of THE PLAYER. --> player's move list
        2. Iterate the moves list from the possible moves of the player
            For each moves of the player's moves list:
            3. create invisible board, then move the 'move'
            4. switch this.whiteToMove = !this.whiteToMove 
            5. generate all the possible moves of the ENEMY --> enemy's move list
            6. for each opponent's moves list:
                7. See if each move has rowEnd and colEnd = player's king row and col
                8. if there is, delete the particular move (which is being iterated) from the player's move list
        9. switch back this.whiteToMove
        
        return player's move list
        */

       const validMoves = this.getAllPossibleMoves(chessConfig);
       console.log(`valid moves before checking: ${validMoves.length}`);
       let playerKing;
       if(this.whiteToMove){
           playerKing = 'wK'
       } else {
           playerKing = 'bK'
       }

       for(let i=validMoves.length-1; i>=0; i--){
            // moving each moves in the player's move list *in the background*
            const invisibleBoard = chessConfig.map((i) => i.map((j) => j));
            invisibleBoard[validMoves[i].rowStart][validMoves[i].colStart] = '--';
            invisibleBoard[validMoves[i].rowEnd][validMoves[i].colEnd] = validMoves[i].getMovedPiece();

            this.whiteToMove = !this.whiteToMove;
            const opponentMoves = this.getAllPossibleMoves(invisibleBoard);
            this.whiteToMove = !this.whiteToMove;

            for(let j=opponentMoves.length-1; j>=0; j--){
                if(invisibleBoard[opponentMoves[j].rowEnd][opponentMoves[j].colEnd] === playerKing){
                    validMoves.splice(i, 1);
                }
            }
        }
        console.log(`valid moves AFTER checking: ${validMoves.length}`);
        console.log(validMoves);
        return validMoves;
    }

    getAllPossibleMoves(board){
        let allMoves = [];
        for(let i=0; i<8; i++){
            for(let j=0; j<8; j++){
                const turn = board[i][j][0]; /* w or b */
                const pieceType = board[i][j][1]; /* P for pawn, R for rook, N for knight, etc */
                if((turn === 'w' && this.whiteToMove) || (turn === 'b' && !this.whiteToMove)){
                    if(pieceType === 'P'){this.pawnMoves(i, j, board, allMoves)}
                    if(pieceType === 'R'){this.rookMoves(i, j, board, allMoves)}
                    if(pieceType === 'N'){this.knightMoves(i, j, board, allMoves)}
                    if(pieceType === 'B'){this.bishopMoves(i, j, board, allMoves)}
                    if(pieceType === 'Q'){this.queenMoves(i, j, board, allMoves)}
                    if(pieceType === 'K'){this.kingMoves(i, j, board, allMoves)}
                }
            }
        }
        return allMoves;
    }

    pawnMoves(row, col, board, allMoves){
        if(this.whiteToMove){
            if(0 < row < 7){
                if(board[row - 1][col] === '--'){
                    allMoves.push(new Move([row, col], [row-1, col], board));
                    if(row == 6 && board[row - 2][col] === '--'){
                        allMoves.push(new Move([row, col], [row-2, col], board));
                    }
                }
                if(col > 0 && board[row-1][col-1][0] === 'b'){
                    allMoves.push(new Move([row, col], [row-1, col-1], board));
                }
                if(col < 7  && board[row-1][col+1][0] === 'b'){
                    allMoves.push(new Move([row, col], [row-1, col+1], board));
                }
            }
        }
        if(!this.whiteToMove){
            if(0 < row < 7){
                if(board[row + 1][col] === '--'){
                    allMoves.push(new Move([row, col], [row+1, col], board));
                    if(row == 1 && board[row + 2][col] === '--'){
                        allMoves.push(new Move([row, col], [row+2, col], board));
                    }
                }
                if(col > 0 && board[row+1][col-1][0] === 'w'){
                    allMoves.push(new Move([row, col], [row+1, col-1], board));
                }
                if(col < 7  && board[row+1][col+1][0] === 'w'){
                    allMoves.push(new Move([row, col], [row+1, col+1], board));
                }
            }
        }
    }

    rookMoves(row, col, board, allMoves){
        const rookMoves = [[0, 1], [0, -1], [1, 0], [-1, 0]];
        let enemy;
        let ally;
        if(this.whiteToMove){
            enemy = 'b';
            ally = 'w';
        } else {
            enemy = 'w';
            ally = 'b';
        }

        for(const moveDirection of rookMoves){
            let rowNext;
            let colNext;
            for(let i=1; i<8; i++){
                rowNext = row + (moveDirection[0]*i);
                colNext = col + (moveDirection[1]*i);
                if(rowNext >= 0 && rowNext <= 7 && colNext >= 0 && colNext <= 7){
                    if(board[rowNext][colNext] === '--'){   
                        allMoves.push(new Move([row, col], [rowNext, colNext], board));
                    } else if (board[rowNext][colNext][0] === enemy){
                        allMoves.push(new Move([row, col], [rowNext, colNext], board));
                        break;
                    } else if (board[rowNext][colNext][0] === ally) {
                        break;
                    }
                } else {
                    break;
                }
            }
        }
    }

    knightMoves(row, col, board, allMoves){
        const knightMovesDirection = [[2, 1], [1, 2], [-2, 1], [-1, 2], [2, -1], [1, -2], [-2, -1], [-1, -2]];
        let enemy;
        let ally;
        if(this.whiteToMove){
            enemy = 'b';
            ally = 'w';
        } else {
            enemy = 'w';
            ally = 'b';
        }

        for(const move of knightMovesDirection){
            let rowNext = row + move[0];
            let colNext = col + move[1];

            if(rowNext >= 0 && rowNext <= 7 && colNext >= 0 && colNext <= 7){
                if(board[rowNext][colNext] === '--'){
                    allMoves.push(new Move([row, col], [rowNext, colNext], board));
                }
                else if(board[rowNext][colNext][0] === enemy){
                    allMoves.push(new Move([row, col], [rowNext, colNext], board));
                }
            }
        }
    }

    bishopMoves(row, col, board, allMoves){
        const bishopMovesDirection = [[-1, 1], [-1, -1], [1, 1], [1, -1]];
        let enemy;
        let ally;
        if(this.whiteToMove){
            enemy = 'b';
            ally = 'w';
        } else {
            enemy = 'w';
            ally = 'b';
        }

        for(const moves of bishopMovesDirection){
            let rowNext;
            let colNext;
            for(let i=1; i<8; i++){
                rowNext = row + (moves[0] * i);
                colNext = col + (moves[1] * i);
                if(rowNext >= 0 && rowNext <= 7 && colNext >= 0 && colNext <= 7){
                    if(board[rowNext][colNext] === '--'){
                        allMoves.push(new Move([row, col], [rowNext, colNext], board));
                    }
                    else if(board[rowNext][colNext][0] === enemy){
                        allMoves.push(new Move([row, col], [rowNext, colNext], board));
                        break;
                    }
                    else if(board[rowNext][colNext][0] === ally){
                        break;
                    }
                }
            }
        }
    }

    queenMoves(row, col, board, allMoves){
        const queenMovesDirection = [[-1, 1], [-1, -1], [1, 1], [1, -1], [0, 1], [0, -1], [1, 0], [-1, 0]];
        let enemy;
        let ally;
        if(this.whiteToMove){
            enemy = 'b';
            ally = 'w';
        } else {
            enemy = 'w';
            ally = 'b';
        }

        for(const moves of queenMovesDirection){
            let rowNext;
            let colNext;
            for(let i=1; i<8; i++){
                rowNext = row + (moves[0] * i);
                colNext = col + (moves[1] * i);
                if(rowNext >= 0 && rowNext <= 7 && colNext >= 0 && colNext <= 7){
                    if(board[rowNext][colNext] === '--'){
                        allMoves.push(new Move([row, col], [rowNext, colNext], board));
                    }
                    else if(board[rowNext][colNext][0] === enemy){
                        allMoves.push(new Move([row, col], [rowNext, colNext], board));
                        break;
                    }
                    else if(board[rowNext][colNext][0] === ally){
                        break;
                    }
                }
            }
        }
    }

    kingMoves(row, col, board, allMoves){
        const kingMovesDirection = [[-1, 1], [-1, -1], [1, 1], [1, -1], [0, 1], [0, -1], [1, 0], [-1, 0]];
        let enemy;
        let ally;
        if(this.whiteToMove){
            enemy = 'b';
            ally = 'w';
        } else {
            enemy = 'w';
            ally = 'b';
        }

        for(const move of kingMovesDirection){
            let rowNext = row + move[0];
            let colNext = col + move[1];

            if(rowNext >= 0 && rowNext <= 7 && colNext >= 0 && colNext <= 7){
                if(board[rowNext][colNext] === '--'){
                    allMoves.push(new Move([row, col], [rowNext, colNext], board));
                }
                else if(board[rowNext][colNext][0] === enemy){
                    allMoves.push(new Move([row, col], [rowNext, colNext], board));
                }
            }
        }
    }

}