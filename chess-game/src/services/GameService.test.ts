import GameService from './GameService';
import { PieceColor, PieceType } from '../models/Piece';

describe('GameService', () => {
  let gameService: GameService;

  beforeEach(() => {
    gameService = new GameService();
  });

  test('should initialize the board correctly', () => {
    const board = gameService['board'];
    expect(board[0][0]?.type).toBe(PieceType.Rook);
    expect(board[0][0]?.color).toBe(PieceColor.White);
    expect(board[7][7]?.type).toBe(PieceType.Rook);
    expect(board[7][7]?.color).toBe(PieceColor.Black);
    expect(board[1][0]?.type).toBe(PieceType.Pawn);
    expect(board[1][0]?.color).toBe(PieceColor.White);
    expect(board[6][0]?.type).toBe(PieceType.Pawn);
    expect(board[6][0]?.color).toBe(PieceColor.Black);
  });

  test('should allow valid pawn moves', () => {
    expect(gameService.makeMove({ x: 0, y: 1 }, { x: 0, y: 3 })).toBe(true); // White pawn moves two squares forward
    expect(gameService.makeMove({ x: 0, y: 6 }, { x: 0, y: 4 })).toBe(true); // Black pawn moves two squares forward
  });

  test('should not allow invalid pawn moves', () => {
    expect(gameService.makeMove({ x: 0, y: 1 }, { x: 0, y: 4 })).toBe(false); // White pawn moves three squares forward
    expect(gameService.makeMove({ x: 0, y: 6 }, { x: 0, y: 3 })).toBe(false); // Black pawn moves three squares forward
  });

  test('should allow valid rook moves', () => {
    gameService['board'][0][0] = { type: PieceType.Rook, color: PieceColor.White, position: { x: 0, y: 0 } };
    expect(gameService.makeMove({ x: 0, y: 0 }, { x: 0, y: 5 })).toBe(true); // White rook moves vertically
    expect(gameService.makeMove({ x: 0, y: 5 }, { x: 5, y: 5 })).toBe(true); // White rook moves horizontally
  });

  test('should not allow invalid rook moves', () => {
    gameService['board'][0][0] = { type: PieceType.Rook, color: PieceColor.White, position: { x: 0, y: 0 } };
    expect(gameService.makeMove({ x: 0, y: 0 }, { x: 5, y: 5 })).toBe(false); // White rook moves diagonally
  });

  test('should allow valid knight moves', () => {
    gameService['board'][0][1] = { type: PieceType.Knight, color: PieceColor.White, position: { x: 1, y: 0 } };
    expect(gameService.makeMove({ x: 1, y: 0 }, { x: 2, y: 2 })).toBe(true); // White knight moves in "L" shape
    expect(gameService.makeMove({ x: 2, y: 2 }, { x: 0, y: 1 })).toBe(true); // White knight moves in "L" shape
  });

  test('should not allow invalid knight moves', () => {
    gameService['board'][0][1] = { type: PieceType.Knight, color: PieceColor.White, position: { x: 1, y: 0 } };
    expect(gameService.makeMove({ x: 1, y: 0 }, { x: 1, y: 2 })).toBe(false); // White knight moves straight
  });

  // Add more tests for other pieces (Bishop, Queen, King)
});