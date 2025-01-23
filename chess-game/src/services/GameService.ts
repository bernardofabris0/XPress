import { Piece, PieceType, PieceColor } from '../models/Piece';

class GameService {
    private board: (Piece | null)[][];
    private currentPlayer: PieceColor;
    private gameActive: boolean;

    constructor() {
        this.board = this.initializeBoard();
        this.currentPlayer = PieceColor.White;
        this.gameActive = true;
    }

    private initializeBoard(): (Piece | null)[][] {
        const board: (Piece | null)[][] = Array(8).fill(null).map(() => Array(8).fill(null));

        // Initialize pawns
        for (let i = 0; i < 8; i++) {
            board[1][i] = { type: PieceType.Pawn, color: PieceColor.White, position: { x: i, y: 1 } };
            board[6][i] = { type: PieceType.Pawn, color: PieceColor.Black, position: { x: i, y: 6 } };
        }

        // Initialize other pieces
        const backRow: PieceType[] = [
            PieceType.Rook, PieceType.Knight, PieceType.Bishop, PieceType.Queen,
            PieceType.King, PieceType.Bishop, PieceType.Knight, PieceType.Rook
        ];

        for (let i = 0; i < 8; i++) {
            board[0][i] = { type: backRow[i], color: PieceColor.White, position: { x: i, y: 0 } };
            board[7][i] = { type: backRow[i], color: PieceColor.Black, position: { x: i, y: 7 } };
        }

        return board;
    }

    public makeMove(from: { x: number; y: number }, to: { x: number; y: number }): boolean {
        if (!this.gameActive) return false;

        const piece = this.board[from.y][from.x];

        if (!piece || piece.color !== this.currentPlayer) return false;

        // Basic move validation (to be expanded)
        if (this.isValidMove(piece, from, to)) {
            this.board[to.y][to.x] = piece;
            this.board[from.y][from.x] = null;
            piece.position = to;
            this.switchPlayer();
            return true;
        }

        return false;
    }

    private isValidMove(piece: Piece, from: { x: number; y: number }, to: { x: number; y: number }): boolean {
        switch (piece.type) {
            case PieceType.Pawn:
                return this.isValidPawnMove(piece, from, to);
            case PieceType.Rook:
                return this.isValidRookMove(piece, from, to);
            case PieceType.Knight:
                return this.isValidKnightMove(piece, from, to);
            case PieceType.Bishop:
                return this.isValidBishopMove(piece, from, to);
            case PieceType.Queen:
                return this.isValidQueenMove(piece, from, to);
            case PieceType.King:
                return this.isValidKingMove(piece, from, to);
            default:
                return false;
        }
    }

    private isValidPawnMove(piece: Piece, from: { x: number; y: number }, to: { x: number; y: number }): boolean {
        const direction = piece.color === PieceColor.White ? 1 : -1;
        const startRow = piece.color === PieceColor.White ? 1 : 6;

        // Move forward
        if (from.x === to.x && this.board[to.y][to.x] === null) {
            if (to.y === from.y + direction) return true;
            if (from.y === startRow && to.y === from.y + 2 * direction && this.board[from.y + direction][from.x] === null) return true;
        }

        // Capture diagonally
        if (Math.abs(from.x - to.x) === 1 && to.y === from.y + direction && this.board[to.y][to.x] !== null) {
            return true;
        }

        return false;
    }

    private isValidRookMove(piece: Piece, from: { x: number; y: number }, to: { x: number; y: number }): boolean {
        if (from.x !== to.x && from.y !== to.y) return false;

        const [start, end] = from.x === to.x ? [from.y, to.y] : [from.x, to.x];
        const direction = start < end ? 1 : -1;

        for (let i = start + direction; i !== end; i += direction) {
            const [x, y] = from.x === to.x ? [from.x, i] : [i, from.y];
            if (this.board[y][x] !== null) return false;
        }

        return true;
    }

    private isValidKnightMove(piece: Piece, from: { x: number; y: number }, to: { x: number; y: number }): boolean {
        const dx = Math.abs(from.x - to.x);
        const dy = Math.abs(from.y - to.y);
        return (dx === 2 && dy === 1) || (dx === 1 && dy === 2);
    }

    private isValidBishopMove(piece: Piece, from: { x: number; y: number }, to: { x: number; y: number }): boolean {
        if (Math.abs(from.x - to.x) !== Math.abs(from.y - to.y)) return false;

        const dx = from.x < to.x ? 1 : -1;
        const dy = from.y < to.y ? 1 : -1;

        for (let i = 1; i < Math.abs(from.x - to.x); i++) {
            if (this.board[from.y + i * dy][from.x + i * dx] !== null) return false;
        }

        return true;
    }

    private isValidQueenMove(piece: Piece, from: { x: number; y: number }, to: { x: number; y: number }): boolean {
        return this.isValidRookMove(piece, from, to) || this.isValidBishopMove(piece, from, to);
    }

    private isValidKingMove(piece: Piece, from: { x: number; y: number }, to: { x: number; y: number }): boolean {
        const dx = Math.abs(from.x - to.x);
        const dy = Math.abs(from.y - to.y);
        return dx <= 1 && dy <= 1;
    }

    private switchPlayer(): void {
        this.currentPlayer = this.currentPlayer === PieceColor.White ? PieceColor.Black : PieceColor.White;
    }
}

export default GameService;