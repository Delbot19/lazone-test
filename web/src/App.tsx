import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import customTheme from "./theme";
import Register from "./pages/Register";

const App = () => {
  return (
    <ChakraProvider theme={customTheme}>
      <Register />
    </ChakraProvider>
  );
};

export default App;
