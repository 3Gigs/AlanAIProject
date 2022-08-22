import { createContext, useReducer } from "react";

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

  return (
    <ThemeContext.Provider value={themeMode}>
      <ThemeDispatchContext.Provider value={themeDispatch}>
        {children}
      </ThemeDispatchContext.Provider>
    </ThemeContext.Provider>
  );
}

export default ThemeProvider;
