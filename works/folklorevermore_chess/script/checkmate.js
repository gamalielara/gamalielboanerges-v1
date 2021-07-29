// /* 
// ------SCRIPT FOR CHECK, CHECKMATE AND ENPASSANT MOVES-----
// */

// let WHITEKINGPOSITION = [];
// let BLACKKINGPOSITION = [];
// let MOVELOG = [];
// let INVISIBLEBOARD = chessConfig.map(i=> i.map(j => j));

// function getKingPosition(){
//     for(let i=0; i<8; i++){
//         for(let j=0; j<8; j++){
//             if(chessConfig[i][j] === 'wK'){
//                 WHITEKINGPOSITION = [i, j];
//             } else if (chessConfig[i][j] === 'bK'){
//                 BLACKKINGPOSITION = [i, j];
//             }
//         }
//     }
// }

// function generateMove(pieceType, startR, startC, endR, endC){
//     const move = {
//         pieceType,
//         startR,
//         startC,
//         endR,
//         endC
//     }
//     MOVELOG.push(move);
// }

// function getValidMoves(){
//     generateAllPiecesMove();
//     const playerMovesLog = MOVELOG.map(i => i);
//     INVISIBLEBOARD = chessConfig.map(i => i.map(j => j));
    
//     let playerKing;
//     if(whiteToMove){
//         playerKing = 'wK'
//     } else {
//         playerKing = 'bK'
//     }

//     for(playerMove of playerMovesLog){
//         INVISIBLEBOARD = chessConfig.map(i => i.map(j => j));
//         INVISIBLEBOARD[playerMove.startR][playerMove.startC] = '--';
//         INVISIBLEBOARD[playerMove.endR][playerMove.endC] = playerMove.pieceType;

//         // changing the roles
//         whiteToMove = !whiteToMove;
//         generateAllPiecesMove();
//         const enemyMovesLog = MOVELOG.map(i => i);
//         whiteToMove = !whiteToMove;

//         for(enemyMove of enemyMovesLog){
//             if(INVISIBLEBOARD[enemyMove.endR][enemyMove.endC] === playerKing){
//                 console.log(`${enemyMove.pieceType} is attacking ${playerKing} at R${enemyMove.endR} C${enemyMove.endC}`);
//                 const i = playerMovesLog.indexOf(playerMove);
//                 playerMovesLog.splice(i, 1);
//             }
//         }
//     }
//     return playerMovesLog;
// }

// function generateAllPiecesMove(){
//     MOVELOG = [];
//     if(whiteToMove){
//         for(let i=0; i<8; i++){
//             for(let j=0; j<8; j++){
//                 if(INVISIBLEBOARD[i][j] === 'wP'){
//                     generatePawnMoves(i, j);
//                 } else if(INVISIBLEBOARD[i][j] === 'wR'){
//                     generateRookMoves(i, j);
//                 } else if(INVISIBLEBOARD[i][j] === 'wN'){
//                     generateKnightMoves(i, j);
//                 } else if(INVISIBLEBOARD[i][j] === 'wB'){
//                     generateBishopMoves(i, j);
//                 } else if(INVISIBLEBOARD[i][j] === 'wQ'){
//                     generateQueenMoves(i, j);
//                 } else if(INVISIBLEBOARD[i][j] === 'wK'){
//                     generateKingMoves(i, j);
//                 } 
//             }
//         }
//     } else {
//         for(let i=0; i<8; i++){
//             for(let j=0; j<8; j++){
//                 if(INVISIBLEBOARD[i][j] === 'bP'){
//                     generatePawnMoves(i, j);
//                 } else if(INVISIBLEBOARD[i][j] === 'bR'){
//                     generateRookMoves(i, j);
//                 } else if(INVISIBLEBOARD[i][j] === 'bN'){
//                     generateKnightMoves(i, j);
//                 } else if(INVISIBLEBOARD[i][j] === 'bB'){
//                     generateBishopMoves(i, j);
//                 } else if(INVISIBLEBOARD[i][j] === 'bQ'){
//                     generateQueenMoves(i, j);
//                 } else if(INVISIBLEBOARD[i][j] === 'bK'){
//                     generateKingMoves(i, j);
//                 } 
//             }
//         }
//     }
// }

// function generatePawnMoves(startRow, startCol){
//     if(whiteToMove){
//         if(startRow == 6){
//             if(INVISIBLEBOARD[startRow-1][startCol] == '--'){
//                 generateMove('wP', startRow, startCol, startRow-1, startCol);
//             }
//             if(INVISIBLEBOARD[startRow-2][startCol] == '--'){
//                 generateMove('wP', startRow, startCol, startRow-2, startCol);
//             }
//             if(startCol < 7 && startCol >= 0){
//                 if(INVISIBLEBOARD[startRow-1][startCol+1][0] == 'b'){
//                     generateMove('wP', startRow, startCol, startRow-1, startCol+1);
//                 }
//             }
//             if(startCol <= 7 && startCol > 0){
//                 if(INVISIBLEBOARD[startRow-1][startCol-1][0] == 'b'){
//                     generateMove('wP', startRow, startCol, startRow-1, startCol-1);
//                 }
//             }
//         } else {
//             if(startRow > 0){
//                 if(INVISIBLEBOARD[startRow-1][startCol] == '--'){
//                     generateMove('wP', startRow, startCol, startRow-1, startCol);
//                 }
//             }
//             if((startCol < 7 && startCol >= 0) && startRow > 0){
//                 if(INVISIBLEBOARD[startRow-1][startCol+1][0] == 'b'){
//                     generateMove('wP', startRow, startCol, startRow-1, startCol+1);
//                 }
//             }
//             if((startCol <= 7 && startCol > 0) && (startRow > 0)){
//                 if(INVISIBLEBOARD[startRow-1][startCol-1][0] == 'b'){
//                     generateMove('wP', startRow, startCol, startRow-1, startCol-1)
//                 }
//             }
//         }
//     } else {
//         if(startRow == 1){
//             if(INVISIBLEBOARD[startRow+1][startCol] == '--'){
//                 generateMove('bP', startRow, startCol, startRow+1, startCol);
//             }
//             if(INVISIBLEBOARD[startRow+2][startCol] == '--'){
//                 generateMove('bP', startRow, startCol, startRow+2, startCol);
//             }
//             if(startCol < 7 && startCol >= 0){
//                 if(INVISIBLEBOARD[startRow+1][startCol+1][0] == 'w'){
//                     generateMove('bP', startRow, startCol, startRow+1, startCol+1);
//                 }
//             }
//             if(startCol <= 7 && startCol > 0){
//                 if(INVISIBLEBOARD[startRow+1][startCol-1][0] == 'w'){
//                     generateMove('bP', startRow, startCol, startRow+1, startCol-1);
//                 }
//             }
//         } else{
//             if(startRow < 7){
//                 if(INVISIBLEBOARD[startRow+1][startCol] == '--'){
//                     generateMove('bP', startRow, startCol, startRow+1, startCol);
//                 }
//             }
//             if((startCol < 7 && startCol >= 0) && (startRow < 7)){
//                 if(INVISIBLEBOARD[startRow+1][startCol+1][0] == 'w'){
//                     generateMove('bP', startRow, startCol, startRow+1, startCol+1);
//                 }
//             }
//             if((startCol <= 7 && startCol > 0) && (startRow < 7)){
//                 if(INVISIBLEBOARD[startRow+1][startCol-1][0] == 'w'){
//                     generateMove('bP', startRow, startCol, startRow+1, startCol-1)
//                 }
//             }
//         }
//     }
// }

// function generateRookMoves(startRow, startCol){
//     const iter = [[1, 0], [-1, 0], [0, 1], [0, -1]];

//     for (let i=0; i<iter.length; i++){
//         let rowNext = startRow;
//         let colNext = startCol;

//         for(let j=0; j<8; j++){
//             rowNext += iter[i][0];
//             colNext += iter[i][1];

//             if((rowNext>-1 && rowNext<8) && (colNext>-1 && colNext<8)){
//                 if(whiteToMove){
//                     if(INVISIBLEBOARD[rowNext][colNext] === '--'){
//                         generateMove('wR', startRow, startCol, rowNext, colNext);
//                     } else if(INVISIBLEBOARD[rowNext][colNext][0] === 'b'){
//                         generateMove('wR', startRow, startCol, rowNext, colNext);
//                         break;
//                     } else if(INVISIBLEBOARD[rowNext][colNext][0] === 'w'){
//                         break;
//                     }
//                 } else {
//                     if(INVISIBLEBOARD[rowNext][colNext] === '--'){
//                         generateMove('bR', startRow, startCol, rowNext, colNext);
//                     } else if(INVISIBLEBOARD[rowNext][colNext][0] === 'w'){
//                         generateMove('bR', startRow, startCol, rowNext, colNext);
//                         break;
//                     } else if(INVISIBLEBOARD[rowNext][colNext][0] === 'b'){
//                         break;
//                     } 
//                 }
//             }
//         }
//     }
// }

// function generateBishopMoves(startRow, startCol){
//     const iter = [[1, 1], [1, -1], [-1, 1], [-1, -1]];

//     for (let i=0; i<iter.length; i++){
//         let rowNext = startRow;
//         let colNext = startCol;

//         for (let j=0; j<8; j++){
//             rowNext += iter[i][0];
//             colNext += iter[i][1];

//             if((rowNext>-1 && rowNext<8) && (colNext>-1 && colNext<8)){
//                 if(whiteToMove){
//                     if((INVISIBLEBOARD[rowNext][colNext] === '--')){
//                         generateMove('wB', startRow, startCol, rowNext, colNext);
//                     } else if(INVISIBLEBOARD[rowNext][colNext][0] === 'b') {
//                         generateMove('wB', startRow, startCol, rowNext, colNext);
//                         break;
//                     }
//                     else if(INVISIBLEBOARD[rowNext][colNext][0] === 'w') {
//                         break;
//                     }
//                 } else {
//                     if(INVISIBLEBOARD[rowNext][colNext] === '--'){
//                         generateMove('bB', startRow, startCol, rowNext, colNext);
//                     } else if(INVISIBLEBOARD[rowNext][colNext][0] === 'w') {
//                         generateMove('bB', startRow, startCol, rowNext, colNext);
//                         break;
//                     }
//                     else if(INVISIBLEBOARD[rowNext][colNext][0] === 'b') {
//                         break;
//                     }
//                 }
//             }
//         }
//     }
// }

// function generateKnightMoves(startRow, startCol){
//     const iter = [[1,2], [1, -2], [2, 1], [2, -1], [-1, 2], [-1, -2], [-2, 1], [-2, -1]];

//     for(let i=0; i<iter.length; i++){
//             const rowEnd = startRow + iter[i][0];
//             const colEnd = startCol + iter[i][1];

//         if((rowEnd > -1 && rowEnd < 8) && (colEnd > -1 && colEnd < 8)){
//             if(whiteToMove){
//                 if((INVISIBLEBOARD[rowEnd][colEnd] === '--') || (INVISIBLEBOARD[rowEnd][colEnd][0] == 'b')){
//                     generateMove('wN', startRow, startCol, rowEnd, colEnd);
//                 }
//             } else {
//                 if((INVISIBLEBOARD[rowEnd][colEnd] === '--') || (INVISIBLEBOARD[rowEnd][colEnd][0] == 'w')){
//                     generateMove('bN', startRow, startCol, rowEnd, colEnd);
//                 }
//             } 
//         }
//     }
// }


// function generateQueenMoves(startRow, startCol){
//     const iter = [[1, 0], [-1, 0], [0, 1], [0, -1], [-1, 1], [-1, -1], [1, 1], [1, -1]];

//     for (let i=0; i<iter.length; i++){
//         let rowNext = startRow;
//         let colNext = startCol;

//         for(let j=0; j<8; j++){
//             rowNext += iter[i][0];
//             colNext += iter[i][1];

//             if ((rowNext > -1 && rowNext < 8) && (colNext > -1 && colNext < 8)){
//                 if(whiteToMove){
//                     if(INVISIBLEBOARD[rowNext][colNext] === '--'){
//                         generateMove('wQ', startRow, startCol, rowNext, colNext);
//                     } else if (INVISIBLEBOARD[rowNext][colNext][0] === 'b'){
//                         generateMove('wQ', startRow, startCol, rowNext, colNext);
//                         break;
//                     } else if (INVISIBLEBOARD[rowNext][colNext][0] === 'w'){
//                         break;
//                     }
//                 } else {
//                     if(INVISIBLEBOARD[rowNext][colNext] === '--'){
//                         generateMove('bQ', startRow, startCol, rowNext, colNext);
//                     } else if (INVISIBLEBOARD[rowNext][colNext][0] === 'w'){
//                         generateMove('bQ', startRow, startCol, rowNext, colNext);
//                         break;
//                     } else if (INVISIBLEBOARD[rowNext][colNext][0] === 'b'){
//                         break;
//                     }
//                 }
//             }
//         }
//     }
// }

// function generateKingMoves(startRow, startCol){
//     const iter = [[1, 0], [-1, 0], [0, 1], [0, -1], [1, -1], [1, 1], [-1, 1], [-1, -1]];

//     for(let i=0; i<iter.length; i++){
//         const rowNext = startRow + iter[i][0];
//         const colNext = startCol + iter[i][1];

//         if((rowNext > -1 && rowNext < 8) && (colNext > -1 && colNext < 8)){
//             if(whiteToMove){
//                 if((INVISIBLEBOARD[rowNext][colNext]==='--') || (INVISIBLEBOARD[rowNext][colNext][0]==='b')){
//                     generateMove('wK', startRow, startCol, rowNext, colNext);
//                 }
//             } else {
//                 if((INVISIBLEBOARD[rowNext][colNext]==='--') || (INVISIBLEBOARD[rowNext][colNext][0]==='w')){
//                     generateMove('bK', startRow, startCol, rowNext, colNext);
//                 }
//             } 
//         }
//     }
// }