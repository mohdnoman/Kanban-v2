import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  colors: {
    stone: "#AEB6BF",
    black: "#000000", 
  },
  styles: {
    global: {
      body: {
        bg: "black",
        color: "stone", 
      },
    },
  },
  extend: {
    backgroundImage: {
      "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      "gradient-conic":
        "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
    },
  },
});

export default theme;
