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

    rookMoves(row, col, allMoves){}

    knightMoves(row, col, allMoves){}

    bishopMoves(row, col, allMoves){}

    queenMoves(row, col, allMoves){}

    kingMoves(row, col, allMoves){}

}