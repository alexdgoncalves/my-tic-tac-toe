import { useState } from "react";
import Board from "./Board/Board";
import { Box, ListItem, ListItemButton, ListItemText, List, Button } from "@mui/material";

import style from "./Game.module.scss";

export default function Game() {

  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const currentSquares = history[currentMove];
  const nextValue = currentMove % 2 === 0;

  function handlePlay(nextSquare: string[]) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquare];
    setHistory(nextHistory);
    setCurrentMove(currentMove + 1);
  }

  function jumpTo(nextMove: number) {
    setCurrentMove(nextMove);
  }

  const moves = history.map((_, move) => {
    return (
      <ListItem key={move} disablePadding >
        {
          move === 0
            ? (
              <ListItemText primary="Go to game start" />
            )
            : (
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
      </ListItem>
    )
  })


  return (
    <Box
      display={"flex"}
      alignItems="flex-start"
      justifyContent={"flex-start"}
      className={style.box}
      width={"100%"}
    >
      <Board onPlay={handlePlay} squares={currentSquares} nextValue={nextValue} />
      <List
        style={{ alignSelf: "flex-start", marginTop: "4.5rem" }}
      >{moves}</List>
    </Box>
  )
}