import React, { createContext, useEffect, useReducer } from "react";
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
        case "set": {
          console.log(action.theme);
          return action.theme;
        }
        default:
          return state;
      }
    }, "light");

  useEffect(() => {
    document.addEventListener("switchThemeMode", (e) => {
      const event = e as CustomEvent;
      if (event.detail === "dark") {
        themeDispatch({ type: "set", theme: "dark" });
      } else if (event.detail === "light") {
        themeDispatch({ type: "set", theme: "light" });
      }
    });
  }, []);

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
