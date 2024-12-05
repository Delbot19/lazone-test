import { extendTheme } from "@chakra-ui/react";

const customTheme = extendTheme({
  colors: {
    primary: "#1E1932",
    secondary: "#9D9D9D",
  },
  styles: {
    global: {
      "html, body": {
        color: "primary", // Définit la couleur par défaut des textes
      },
    },
  },
  components: {
    Button: {
      variants: {
        1: {
          backgroundColor: "primary",
          color: "white",
          width: "447px",
          height: "40px",
          padding: "10px 15px",
          gap: "10px",
          borderRadius: "6px",
        },
        2: {
          backgroundColor: "white",
          color: "primary",
          width: "226px",
          height: "40px",
          padding: "10px 15px",
          gap: "10px",
          borderRadius: "6px",
          borderWidth: "1px ",
        },
      },
    },
  },
});

export default customTheme;
