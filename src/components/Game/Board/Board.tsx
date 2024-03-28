import Grid from '@mui/material/Grid'; // Grid version 1
import Square from './Square/Square';
import { Box } from "@mui/material";

interface BoardProps {
  onPlay: (squares: string[]) => void;
  squares: string[];
  nextValue: boolean;
  winners: number[] | null;
}

export default function Board({ onPlay, squares, nextValue, winners }: BoardProps) {
  const rowLength = 3;

  const Rows = Array(rowLength).fill(null).map((_, rowIndex) => {
    const Column = Array(rowLength).fill(null).map((_, columnIndex) => {
      /*
        Primeiro é encontrado a coluna atual do loop com => rowIndex * rowLength
        Depois é somado a coluna atual com o indice da linha => columnIndex
      */
      const indexSquare = (rowIndex * rowLength) + columnIndex;
      const isWinner = winners && winners.includes(indexSquare) || false;
      return <Square key={indexSquare} isWinner={isWinner} value={squares[indexSquare]} onPlay={() => handleClick(indexSquare)} />
    });
    return (
      <Grid key={rowIndex} item xs={6} md={6} display="flex" justifyContent={"center"} gap={1} >
        {Column}
      </Grid>
    )
  });



  function handleClick(index: number) {
    if (squares[index]) {
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