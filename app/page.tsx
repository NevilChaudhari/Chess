'use client';
import { useEffect, useState } from "react";

interface Piece {
  sprite: string;
  color: string;
  type: string;
  col: number;
  row: number;
  move: number;
  alive: boolean;
}

type Turn = "white" | "black";

export default function Home() {

  const [moves, setMoves] = useState(0);
  const [turn, setTurn] = useState("white");

  const [lastMove, setLastMove] = useState({
    "row": 0,
    "col": 0
  });
  const [newMove, setNewMove] = useState({
    "row": 0,
    "col": 0
  });

  const [activePiece, setActivePiece] = useState<Piece | null>(null);

  const [pieces, setPieces] = useState([
    {
      "sprite": "/pieces/rook-b.png",
      "color": "black",
      "type": "rook",
      "col": 0,
      "row": 0,
      "move": 0,
      "alive": true,
    },
    {
      "sprite": "/pieces/rook-b.png",
      "color": "black",
      "type": "rook",
      "col": 7,
      "row": 0,
      "move": 0,
      "alive": true,
    },
    {
      "sprite": "/pieces/pawn-b.png",
      "color": "black",
      "type": "pawn",
      "col": 0,
      "row": 1,
      "move": 0,
      "alive": true,
    },
    {
      "sprite": "/pieces/rook-w.png",
      "color": "white",
      "type": "rook",
      "col": 0,
      "row": 7,
      "move": 0,
      "alive": true,
    },
    {
      "sprite": "/pieces/rook-w.png",
      "color": "white",
      "type": "rook",
      "col": 7,
      "row": 7,
      "move": 0,
      "alive": true,
    },
    {
      "sprite": "/pieces/pawn-w.png",
      "color": "white",
      "type": "pawn",
      "col": 7,
      "row": 6,
      "move": 0,
      "alive": true,
    },
  ])

  const movePiece = (col: number, row: number, piece: Piece | null) => {
    if (piece !== null && (col !== piece.col || row !== piece.row)) {

      setPieces(prev => prev.map((p, i) => {
        if (p.row === row && p.col === col && piece.color !== p.color) {
          return { ...p, alive: false }
        }
        if (p === activePiece) {
          return { ...p, col, row, move: p.move + 1 }
        }
        return p;
      })
      )

      setLastMove({
        "row": piece.row,
        "col": piece.col
      })

      setNewMove({
        "row": row,
        "col": col
      })

      setMoves(moves + 1);

      if (turn === 'white') {
        setTurn('black');
      } else {
        setTurn('white');
      }

      setActivePiece(null);
    }
  }

  const Dots = ({ col, row }: { col: number, row: number }) => {
    return (<div
      onClick={() => movePiece(col, row, activePiece ?? null)}
      className="w-full h-full flex items-center justify-center transition-all duration-100 absolute z-10"
    >
      <div className="flex w-8 h-8 bg-gray-500/50 rounded-full items-center justify-center text-white" >{row},{col}</div>
    </div>)
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
                <div className="absolute top-0 left-0 p-1 text-xs">{row},{col}</div>

                {/* Pieces */}
                {pieces.map((p, index) => (
                  <div key={index} className="flex">

                    {/* Piece */}
                    {(col === p.col && row === p.row) && p.alive && (<div onClick={() => { (activePiece === p || turn !== p.color) ? setActivePiece(null) : setActivePiece(p); }} className={`${activePiece === p ? 'bg-blue-300' : ''} w-full h-auto flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 items-center justify-center transition-all duration-100 z-5`} >
                      <img src={p.sprite} draggable={false} className="w-full h-full select-none object-cover" />
                    </div>)}
                  </div>
                )
                )}

                {/* Rook Moves */}
                {activePiece && activePiece.type === 'rook' && (col === activePiece.col || row === activePiece.row) && (col !== activePiece.col || row !== activePiece.row) && (
                  <Dots col={col} row={row} />
                )}

                {/* Pawn Moves */}
                {activePiece && activePiece.type === 'pawn' && (col !== activePiece.col || row !== activePiece.row) && col === activePiece.col && 
                (activePiece.color === 'white' 
                ? row >= (activePiece.row - (activePiece.move > 0 ? 1 : 2)) && row < (activePiece.row) 
                : row <= (activePiece.row + (activePiece.move > 0 ? 1 : 2)) && row > (activePiece.row)) && (
                  <Dots col={col} row={row} />
                )}

                {/* show previous position and new position */}
                {moves > 0 && (row === lastMove.row || row === newMove.row) && (col === lastMove.col || col === newMove.col) && (
                  <div
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
