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

  const [ignorePos, setIgnorePos] = useState([{}]);

  const [pieces, setPieces] = useState([
    {
      "sprite": "/pieces/rook-b.png",
      "color": "black",
      "type": "rook",
      "row": 0,
      "col": 7,
      "move": 0,
      "alive": true,
    },
    {
      "sprite": "/pieces/pawn-b.png",
      "color": "black",
      "type": "pawn",
      "row": 1,
      "col": 0,
      "move": 0,
      "alive": true,
    },
    {
      "sprite": "/pieces/bishop-b.png",
      "color": "black",
      "type": "bishop",
      "row": 0,
      "col": 5,
      "move": 0,
      "alive": true,
    },
    {
      "sprite": "/pieces/knight-b.png",
      "color": "black",
      "type": "knight",
      "row": 0,
      "col": 1,
      "move": 0,
      "alive": true,
    },
    {
      "sprite": "/pieces/queen-b.png",
      "color": "black",
      "type": "queen",
      "row": 0,
      "col": 4,
      "move": 0,
      "alive": true,
    },
    {
      "sprite": "/pieces/king-b.png",
      "color": "black",
      "type": "king",
      "row": 0,
      "col": 3,
      "move": 0,
      "alive": true,
    },
    {
      "sprite": "/pieces/rook-w.png",
      "color": "white",
      "type": "rook",
      "row": 7,
      "col": 0,
      "move": 0,
      "alive": true,
    },
    {
      "sprite": "/pieces/pawn-w.png",
      "color": "white",
      "type": "pawn",
      "row": 6,
      "col": 7,
      "move": 0,
      "alive": true,
    },
    {
      "sprite": "/pieces/bishop-w.png",
      "color": "white",
      "type": "bishop",
      "row": 7,
      "col": 5,
      "move": 0,
      "alive": true,
    },
    {
      "sprite": "/pieces/knight-w.png",
      "color": "white",
      "type": "knight",
      "row": 7,
      "col": 1,
      "move": 0,
      "alive": true,
    },
    {
      "sprite": "/pieces/queen-w.png",
      "color": "white",
      "type": "queen",
      "row": 7,
      "col": 4,
      "move": 0,
      "alive": true,
    },
    {
      "sprite": "/pieces/king-w.png",
      "color": "white",
      "type": "king",
      "row": 7,
      "col": 3,
      "move": 0,
      "alive": true,
    },
  ])

  const selectPiece = (p: Piece) => {
    (activePiece === p || turn !== p.color)
      ? setActivePiece(null)
      : setActivePiece(p);
  }

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
    // console.log(`${row},${col}`);

    return (<div
      onClick={() => movePiece(col, row, activePiece ?? null)}
      className="w-full h-full flex items-center justify-center transition-all duration-100 absolute z-10"
    >
      <div className="flex w-8 h-8 bg-gray-500/50 rounded-full items-center justify-center text-white" >{row},{col}</div>
    </div>)
  }

  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen">

      {/* Chess Board */}
      <div className="relative grid grid-cols-8 self-center gap-0 mx-5 my-5 md:w-200 md:h-200 w-90 h-90 text-black text-sm">
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
                    {(col === p.col && row === p.row) && p.alive && (<div onClick={() => selectPiece(p)} className={`${activePiece === p ? 'bg-blue-300' : ''} w-full h-auto flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 items-center justify-center transition-all duration-100 z-5`} >
                      <img src={p.sprite} draggable={false} className="w-full h-full select-none object-cover" />
                    </div>)}
                  </div>
                )
                )}

                {/* Rook && Queen Moves */}
                {activePiece && (activePiece.type === 'rook') && (col !== activePiece.col || row !== activePiece.row) && (col === activePiece.col || row === activePiece.row) && (
                  <Dots col={col} row={row} />
                )}

                {/* Pawn Moves */}
                {activePiece && activePiece.type === 'pawn' && (col !== activePiece.col || row !== activePiece.row) && col === activePiece.col &&
                  (activePiece.color === 'white'
                    ? row >= (activePiece.row - (activePiece.move > 0 ? 1 : 2)) && row < (activePiece.row)
                    : row <= (activePiece.row + (activePiece.move > 0 ? 1 : 2)) && row > (activePiece.row)) && (
                    <Dots col={col} row={row} />
                  )}

                {/* Bishop && Queen Moves */}
                {Array.from({ length: 8 }).map((_, i) => {
                  return activePiece && (activePiece.type === 'bishop') && (col !== activePiece.col || row !== activePiece.row) &&
                    (activePiece.color === 'white'
                      ? ((row === activePiece.row - i || row === activePiece.row + i) && (col === activePiece.col - i || col === activePiece.col + i))
                      : ((row === activePiece.row + i || row === activePiece.row - i) && (col === activePiece.col + i || col === activePiece.col - i))
                    ) &&
                    (
                      <div key={i}>
                        <Dots col={col} row={row} />
                      </div>
                    )
                })}

                {/* Knight Moves */}
                {activePiece && activePiece.type === 'knight' && (col !== activePiece.col || row !== activePiece.row) &&
                  (
                    (row === activePiece.row - 1 || row === activePiece.row + 1) && (col === activePiece.col - 2 || col === activePiece.col + 2) || (row === activePiece.row - 2 || row === activePiece.row + 2) && (col === activePiece.col - 1 || col === activePiece.col + 1)
                  ) && (
                    <Dots col={col} row={row} />
                  )}

                {/* Queen Moves */}
                {Array.from({ length: 8 }).map((_, i) => {
                  return activePiece && (activePiece.type === 'queen') && (col !== activePiece.col || row !== activePiece.row) &&
                    (
                      (activePiece.color === 'white'
                        ? ((row === activePiece.row - i || row === activePiece.row + i) && (col === activePiece.col - i || col === activePiece.col + i))
                        : ((row === activePiece.row + i || row === activePiece.row - i) && (col === activePiece.col + i || col === activePiece.col - i))
                      )
                      ||
                      (row === activePiece.row) || (col === activePiece.col)
                    ) &&
                    (
                      <div key={i}>
                        <Dots col={col} row={row} />
                      </div>
                    )
                })}

                {/* King Moves */}
                {activePiece && activePiece.type === 'king' && (col !== activePiece.col || row !== activePiece.row) &&
                  (
                    (row <= activePiece.row + 1 && row >= activePiece.row - 1) &&
                    (col <= activePiece.col + 1 && col >= activePiece.col - 1)
                  ) && (
                    <Dots col={col} row={row} />
                  )}

                {/* show previous position and new position */}
                {moves > 0 && ((row === newMove.row && col === newMove.col) || (row === lastMove.row && col === lastMove.col)) && (
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
