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
        return this.getAllPossibleMoves();
    }

    getAllPossibleMoves(){
        let allMoves = [];
        for(let i=0; i<8; i++){
            for(let j=0; j<8; j++){
                const turn = chessConfig[i][j][0]; /* w or b */
                const pieceType = chessConfig[i][j][1]; /* P for pawn, R for rook, N for knight, etc */
                if((turn === 'w' && this.whiteToMove) || (turn === 'b' && !this.whiteToMove)){
                    if(pieceType === 'P'){this.pawnMoves(i, j, allMoves)}
                    if(pieceType === 'R'){this.rookMoves(i, j, allMoves)}
                    if(pieceType === 'N'){this.knightMoves(i, j, allMoves)}
                    if(pieceType === 'B'){this.bishopMoves(i, j, allMoves)}
                    if(pieceType === 'Q'){this.queenMoves(i, j, allMoves)}
                    if(pieceType === 'K'){this.kingMoves(i, j, allMoves)}
                }
            }
        }
        return allMoves;
    }

    pawnMoves(row, col, allMoves){
        if(this.whiteToMove){
            if(0 < row < 7){
                if(chessConfig[row - 1][col] === '--'){
                    allMoves.push(new Move([row, col], [row-1, col], chessConfig));
                    if(row == 6 && chessConfig[row - 2][col] === '--'){
                        allMoves.push(new Move([row, col], [row-2, col], chessConfig));
                    }
                }
                if(col > 0 && chessConfig[row-1][col-1][0] === 'b'){
                    allMoves.push(new Move([row, col], [row-1, col-1], chessConfig));
                }
                if(col < 7  && chessConfig[row-1][col+1][0] === 'b'){
                    allMoves.push(new Move([row, col], [row-1, col+1], chessConfig));
                }
            }
        }
        if(!this.whiteToMove){
            if(0 < row < 7){
                if(chessConfig[row + 1][col] === '--'){
                    allMoves.push(new Move([row, col], [row+1, col], chessConfig));
                    if(row == 1 && chessConfig[row + 2][col] === '--'){
                        allMoves.push(new Move([row, col], [row+2, col], chessConfig));
                    }
                }
                if(col > 0 && chessConfig[row+1][col-1][0] === 'w'){
                    allMoves.push(new Move([row, col], [row+1, col-1], chessConfig));
                }
                if(col < 7  && chessConfig[row+1][col+1][0] === 'w'){
                    allMoves.push(new Move([row, col], [row+1, col+1], chessConfig));
                }
            }
        }
    }

    rookMoves(row, col, allMoves){
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
                    if(chessConfig[rowNext][colNext] === '--'){   
                        allMoves.push(new Move([row, col], [rowNext, colNext], chessConfig));
                    } else if (chessConfig[rowNext][colNext][0] === enemy){
                        allMoves.push(new Move([row, col], [rowNext, colNext], chessConfig));
                        break;
                    } else if (chessConfig[rowNext][colNext][0] === ally) {
                        break;
                    }
                } else {
                    break;
                }
            }
        }
    }

    knightMoves(row, col, allMoves){
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
                if(chessConfig[rowNext][colNext] === '--'){
                    allMoves.push(new Move([row, col], [rowNext, colNext], chessConfig));
                }
                else if(chessConfig[rowNext][colNext][0] === enemy){
                    allMoves.push(new Move([row, col], [rowNext, colNext], chessConfig));
                }
            }
        }
    }

    bishopMoves(row, col, allMoves){
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
                    if(chessConfig[rowNext][colNext] === '--'){
                        allMoves.push(new Move([row, col], [rowNext, colNext], chessConfig));
                    }
                    else if(chessConfig[rowNext][colNext][0] === enemy){
                        allMoves.push(new Move([row, col], [rowNext, colNext], chessConfig));
                        break;
                    }
                    else if(chessConfig[rowNext][colNext][0] === ally){
                        break;
                    }
                }
            }
        }
    }

    queenMoves(row, col, allMoves){
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
                    if(chessConfig[rowNext][colNext] === '--'){
                        allMoves.push(new Move([row, col], [rowNext, colNext], chessConfig));
                    }
                    else if(chessConfig[rowNext][colNext][0] === enemy){
                        allMoves.push(new Move([row, col], [rowNext, colNext], chessConfig));
                        break;
                    }
                    else if(chessConfig[rowNext][colNext][0] === ally){
                        break;
                    }
                }
            }
        }
    }

    kingMoves(row, col, allMoves){
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
                if(chessConfig[rowNext][colNext] === '--'){
                    allMoves.push(new Move([row, col], [rowNext, colNext], chessConfig));
                }
                else if(chessConfig[rowNext][colNext][0] === enemy){
                    allMoves.push(new Move([row, col], [rowNext, colNext], chessConfig));
                }
            }
        }
    }

}