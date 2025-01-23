import React, { useState, useEffect } from 'react';
import './Board.css';
import Piece from '../models/Piece';
import GameService from '../services/GameService';

const Board = () => {
    const [board, setBoard] = useState([]);
    const [currentPlayer, setCurrentPlayer] = useState('white');
    const gameService = new GameService();

    useEffect(() => {
        const initialBoard = gameService.initializeBoard();
        setBoard(initialBoard);
    }, []);

    const handlePieceMove = (from, to) => {
        const newBoard = gameService.movePiece(from, to);
        setBoard(newBoard);
        setCurrentPlayer(currentPlayer === 'white' ? 'black' : 'white');
    };

    return (
        <div className="board">
            {board.map((row, rowIndex) => (
                <div key={rowIndex} className="board-row">
                    {row.map((piece, colIndex) => (
                        <div
                            key={colIndex}
                            className="board-square"
                            onClick={() => handlePieceMove(selectedPiece, { row: rowIndex, col: colIndex })}
                        >
                            {piece && <Piece type={piece.type} color={piece.color} />}
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default Board;