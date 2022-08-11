import { useReducer } from "preact/hooks";
import { createContext } from "react";

enum themeModeActionType {
  CHANGED = "changed",
}

interface themeModeAction {
  type: themeModeActionType
  theme: "dark" | "light"
}

export const ThemeContext = createContext<null | "dark" | "light">(null);
// eslint-disable-next-line func-call-spacing
export const ThemeDispatchContext = createContext<null | ((action: themeModeAction) => void)>(null);

const [themeMode, dispatch] = useReducer(
  (themeMode: "dark" | "light", action: themeModeAction) => {
    switch (action.type) {
      case "changed": {
        return action.theme;
      }
      default: {
        throw Error("Unknown action: " + action.type);
      }
    }
  },
  "dark"
);

function ThemeProvider ({ children }: { children: JSX.Element }) {
  return (
      <ThemeContext.Provider value={themeMode}>
          <ThemeDispatchContext.Provider value={dispatch}>
              {children}
          </ThemeDispatchContext.Provider>
      </ThemeContext.Provider>
  );
}

export default ThemeProvider;
