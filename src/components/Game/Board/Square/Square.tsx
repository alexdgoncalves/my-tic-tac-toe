import { Button, styled } from "@mui/material";

interface SquareProps {
  value: string;
  onPlay: (squares: string[]) => void;
  isWinner: boolean;
}

export default function Square({ value, onPlay, isWinner }: SquareProps) {
  let color = value === "X" ? "#D32F2F" : "#1976D2";
  color = isWinner ? "#388E3C" : color;

  const ButtonCustom = styled(Button)({
    height: "100px",
    width: "100px",
    fontSize: "4.5rem",
    color: color,
    borderColor: isWinner ? "#388E3C" : "#004D9C",
    backgroundColor: "#0A233D",
    '&:hover': {
      backgroundColor: "#0A233D",
      borderColor: "gray",
    },
  });
  return (
    <ButtonCustom
      variant="outlined"
      size="large"
      content={value}
      onClick={() => onPlay([value])}
    >
      {value}
    </ButtonCustom>
  );
}