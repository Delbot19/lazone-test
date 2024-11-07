import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import customTheme from "./theme";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Error404 from "./pages/Error404";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <ChakraProvider theme={customTheme}>
      <Router>
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/error404" element={<Error404 />} />
        </Routes>
      </Router>
    </ChakraProvider>
  );
};

export default App;
