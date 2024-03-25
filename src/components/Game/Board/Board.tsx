import Grid from '@mui/material/Unstable_Grid2';
import Square from './Square/Square';
import { Box } from "@mui/material";

interface BoardProps {
  onPlay: (squares: string[]) => void;
  squares: string[];
  nextValue: boolean;
}

export default function Board({ onPlay, squares, nextValue }: BoardProps) {
  const rowLength = 3;

  const Rows = Array(rowLength).fill(null).map((_, rowIndex) => {
    const Column = Array(rowLength).fill(null).map((_, columnIndex) => {
      /*
        Primeiro é encontrado a coluna atual do loop com => rowIndex * rowLength
        Depois é somado a coluna atual com o indice da linha => columnIndex
      */
      const indexSquare = (rowIndex * rowLength) + columnIndex;
      return <Square key={indexSquare} value={squares[indexSquare]} onPlay={() => handleClick(indexSquare)} />
    });
    return (
      <Grid key={rowIndex} xs={6} md={6} display="flex" justifyContent={"center"} gap={1} >
        {Column}
      </Grid>
    )
  });

  function calculateWinner(squares: string[]) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        console.log('Winner')
        return squares[a];
      }
    }
    return null;
  }

  function handleClick(index: number) {
    if (calculateWinner(squares) || squares[index]) {
      return;
    }

    const copySquares = [...squares];
    copySquares[index] = nextValue ? 'X' : 'O';
    onPlay(copySquares);
  }


  return (
    <Box
      display={"flex"}
      alignItems="center"
      justifyContent={"center"}
      flexDirection={"column"}
    >
      <h1>Tic Tac Toe Game</h1>
      <Grid container gap={1} display="flex" alignContent={"center"} justifyContent={"center"}>
        {Rows}
      </Grid>
    </Box>

  )
}