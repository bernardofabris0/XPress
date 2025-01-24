import React from 'react';
import './Board.css';

const Board: React.FC = () => {
    const renderSquare = (i: number) => {
        const x = i % 8;
        const y = Math.floor(i / 8);
        const isBlack = (x + y) % 2 === 1;
        return <div className={`square ${isBlack ? 'black' : 'white'}`} key={i}></div>;
    };

    const squares = [];
    for (let i = 0; i < 64; i++) {
        squares.push(renderSquare(i));
    }

    return <div className="board">{squares}</div>;
};

export default Board;