'use client';
import { useEffect, useState } from "react";

interface Piece {
  sprite: string;
  color: string;
  type: string;
  col: number;
  row: number;
  move: number;
}

export default function Home() {

  const [moves, setMoves] = useState(0);

  const [lastMove, setLastMove] = useState({
    "row": 0,
    "col": 0
  });
  const [newMove, setNewMove] = useState({
    "row": 0,
    "col": 0
  });

  const [activePiece, setActivePiece] = useState<Piece | null>(null);

  const [rook, setRook] = useState<Piece>({
    "sprite": "/pieces/rook-b.png",
    "color": "black",
    "type": "rook",
    "col": 0,
    "row": 0,
    "move": 0
  });

  const movePiece = (col: number, row: number, piece: Piece | null) => {
    if (piece !== null && (col !== piece.col || row !== piece.row)) {
      if (piece === rook) {
        setRook({ ...rook, col, row, move: rook.move + 1 });
      }
      setLastMove({
        "row": piece.row,
        "col": piece.col
      })
      setNewMove({
        "row": row,
        "col": col
      })
      setMoves(moves + 1);
      setActivePiece(null);
      // alert([col][row] !== [rook.col][rook.row])
    }
  }

  return (
    <div className="flex flex-col items-center justify-center">

      {/* Chess Board */}
      <div className="relative grid grid-cols-8 self-center gap-0 mx-5 my-5 w-200 h-200 text-black">
        {Array.from({ length: 8 }).map((_, row) =>
          Array.from({ length: 8 }).map((_, col) => {
            const letter = String.fromCharCode(97 + col);
            return (
              <div key={col}
                className={`
                ${row % 2 === 0 ? (col % 2 === 0 ? 'bg-[#3c465a]' : 'bg-[#e0e0e8]') : (col % 2 === 0 ? 'bg-[#e0e0e8]' : 'bg-[#3c465a]')}
                w-full
                h-full
                relative
              `}
              >
                <div className="absolute top-0 left-0 p-1 text-xs">{letter}{row + 1}</div>

                {/* Piece */}
                {col === rook.col && row === rook.row && (
                  <div onClick={() => { activePiece === rook ? setActivePiece(null) : setActivePiece(rook); }} className={`${activePiece === rook ? 'bg-blue-300' : ''} w-full h-auto flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 items-center justify-center transition-all duration-100 z-10`}
                  >
                    {/* <div className="flex">{mousePos.x}</div> */}
                    <img src={rook.sprite} draggable={false} className="w-full h-full select-none object-cover" />
                  </div>
                )}

                {/* Moves */}
                {activePiece === rook && (col === rook.col || row === rook.row) && (col !== rook.col || row !== rook.row) && (
                  <div
                    onClick={() => movePiece(col, row, activePiece ?? null)}
                    className="w-full h-full flex items-center justify-center transition-all duration-100 absolute z-5"
                  >
                    <div className="flex w-8 h-8 bg-gray-500/50 rounded-full" />
                  </div>
                )}
                {moves > 0 && (row === lastMove.row || row === newMove.row) && (col === lastMove.col || col === newMove.col) && (
                  <div
                    onClick={() => movePiece(col, row, activePiece ?? null)}
                    className="w-full h-full bg-yellow-300/50 flex items-center justify-center transition-all duration-100 absolute z-0" />
                )}
              </div>
            )
          })
        )
        }
      </div>

      {/* Moves */}
      <div className="flex text-white">{moves}</div>
    </div>
  );
}
