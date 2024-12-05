import React from "react";
import { Button } from "@chakra-ui/react";

interface IButton {
  variant?: "1" | "2";
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
}

function FButton({ variant, children, type, onClick }: IButton) {
  return (
    <Button variant={variant} type={type} onClick={onClick}>
      {children}
    </Button>
  );
}

export default FButton;
