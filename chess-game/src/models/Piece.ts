export enum PieceType {
    Pawn,
    Rook,
    Knight,
    Bishop,
    Queen,
    King
}

export enum PieceColor {
    White,
    Black
}

export interface Piece {
    type: PieceType;
    color: PieceColor;
    position: { x: number; y: number };
}