'use client';
import { useState } from "react";

interface Piece {
  color: string;
  type: string;
  col: number;
  row: number;
  move: number;
}

export default function Home() {
  const [activePiece, setActivePiece] = useState<Piece | null>(null);

  const [rook, setRook] = useState<Piece>({
    "color": "white",
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
      setActivePiece(null);
      // alert([col][row] !== [rook.col][rook.row])
    }
  }

  return (
    <div className="grid grid-cols-8 self-center gap-0 mx-5 my-5 w-200 h-200 text-black">
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
              {col === rook.col && row === rook.row && (
                <div onClick={() => { activePiece === rook ? setActivePiece(null) : setActivePiece(rook); }} className={`${activePiece === rook ? 'border-2 bg-[#5f5955]' : 'bg-[#5f5955]'} hover:border-2 border-blue-500 flex hover:bg-[#f0f0f0] rounded-full absolute w-15 h-15 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 items-center justify-center`}>{rook.move}</div>
              )}
              {activePiece === rook && (col === rook.col || row === rook.row) && (col !== rook.col || row !== rook.row) && (
                <div
                  onClick={() => movePiece(col, row, activePiece ?? null)}
                  className="w-full h-full bg-green-500/50 border border-white"
                />
              )}
            </div>
          )
        })
      )
      }
    </div>
  );
}
