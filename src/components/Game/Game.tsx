import { useState } from "react";
import Board from "./Board/Board";
import { Box, ListItem, ListItemButton, ListItemText, List, Button, IconButton } from "@mui/material";
import Snackbar from '@mui/material/Snackbar';
import CloseIcon from '@mui/icons-material/Close';
import style from "./Game.module.scss";

export default function Game() {

  const [endGame, setEndGame] = useState(false);
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const currentSquares = history[currentMove];
  const nextValue = currentMove % 2 === 0;
  const [winners, setWinners] = useState<number[] | null>(null);
  const [snack, setSnack] = useState(false);
  const squaresFilled = currentSquares.filter(Boolean).length;

  function handlePlay(nextSquare: string[]) {
    if (!endGame) {
      const nextHistory = [...history.slice(0, currentMove + 1), nextSquare];
      setHistory(nextHistory);
      setCurrentMove(currentMove + 1);
      const [hasWinner, lineWinner] = calculateWinner(nextSquare) || [null, []]; // Provide default values for lineWinner
      if (hasWinner) {
        setEndGame(endGame => endGame ? endGame : !endGame);
        setWinners([...lineWinner]);
        setSnack(true);
        return;
      }
    }
  };

  function jumpTo(nextMove: number) {
    setWinners(null);
    setEndGame(endGame => endGame ? !endGame : endGame);
    setCurrentMove(nextMove);
  };

  function resetGame() {
    const initialHistory = [Array(9).fill(null)];
    setHistory(initialHistory);
    setCurrentMove(0);
    setEndGame(false);
    setWinners(null);
  };

  const handleClose = (_event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnack(false);
  };

  const moves = history.map((_, move) => {
    return (
      <ListItem key={move} disablePadding >
        <>
          {
            move === 0
              ? (
                <ListItemText primary="Click to back to the past" />
              )
              :
              squaresFilled > 0 && (
                <ListItemButton style={{ padding: "2px 0px", margin: "0" }}>
                  <Button
                    variant="outlined"
                    onClick={() => jumpTo(move)}
                  >
                    Go to move #{move}
                  </Button>
                </ListItemButton>
              )
          }

        </>

      </ListItem>
    )
  });

  const close = (
    <IconButton
      size="small"
      aria-label="close"
      color="inherit"
      onClick={handleClose}
    >
      <CloseIcon fontSize="small" />
    </IconButton>
  )

  function calculateWinner(squares: string[]): [string | null, number[]] | null {
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
        return [squares[a], lines[i]];
      }
    }
    return null;
  }


  return (
    <Box
      display={"flex"}
      alignItems="flex-start"
      justifyContent={"flex-start"}
      className={style.box}
      width={"100%"}
    >
      <Board
        key={currentMove} // Adicionando chave única ao componente Board
        onPlay={handlePlay}
        squares={currentSquares}
        nextValue={nextValue}
        winners={winners}
      />
      <List
        style={
          {
            alignSelf: "flex-start",
            marginTop: "4.5rem"
          }
        }
      >
        {squaresFilled > 0 && moves}
        {
          endGame && (
            <ListItemButton style={{ padding: "2px 0px", margin: "0" }}>
              <Button
                variant="outlined"
                onClick={() => resetGame()}
              >
                Reset game
              </Button>
            </ListItemButton>
          )
        }
        {
          (snack && winners) && (
            <Snackbar
              anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
              open={snack}
              onClose={handleClose}
              message={`The Winner is: ${currentSquares[winners[0]]}`}
              action={close}
            />
          )
        }
      </List>
    </Box>
  )
}