import { Button, styled } from "@mui/material";

interface SquareProps {
  value: string;
  onPlay: (squares: string[]) => void;
}

export default function Square({ value, onPlay }: SquareProps) {
  const ButtonCustom = styled(Button)({
    height: "100px",
    width: "100px",
    fontSize: "4.5rem",
    borderColor: "#004D9C",
    backgroundColor: "#0A233D",
    '&:hover': {
      backgroundColor: "#0A233D",
      borderColor: "gray",
    },
  });
  console.log(value)
  return (
    <ButtonCustom
      variant="outlined"
      size="large"
      content={value}
      color={value === "X" ? "error" : "primary"}
      onClick={() => onPlay([value])}
    >
      {value}
    </ButtonCustom>
  );
}