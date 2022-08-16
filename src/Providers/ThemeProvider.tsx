import React, { createContext, useReducer } from "react";
import { createTheme, ThemeProvider as MUIThemeProvider } from "@mui/material/styles";

interface ThemeAction {
  type: string;
  theme?: "dark" | "light";
}

export const ThemeContext = createContext<"dark" | "light" | undefined>(undefined);
// eslint-disable-next-line func-call-spacing
export const ThemeDispatchContext = createContext<undefined | React.Dispatch<ThemeAction>>(undefined);

function ThemeProvider ({ children }: { children: JSX.Element }) {
  const [themeMode, themeDispatch] = useReducer<((state: "dark" | "light", action: ThemeAction) => any)>(
    (state, action) => {
      switch (action.type) {
        case "toggle": {
          return state === "dark" ? "light" : "dark";
        }
        default:
          return state;
      }
    }, "light");

  const darkTheme = createTheme({
    palette: {
      mode: "dark"
    }
  });

  const lightTheme = createTheme({
    palette: {
      mode: "light"
    }
  });

  return (
    <ThemeContext.Provider value={themeMode}>
      <ThemeDispatchContext.Provider value={themeDispatch}>
        <MUIThemeProvider theme={ themeMode === "dark" ? darkTheme : lightTheme}>
          {children}
        </MUIThemeProvider>
      </ThemeDispatchContext.Provider>
    </ThemeContext.Provider>
  );
}

export default ThemeProvider;
