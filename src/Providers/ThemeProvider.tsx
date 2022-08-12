import React, { createContext, useState } from "react";

export const ThemeContext = createContext<undefined | "dark" | "light">(undefined);
// eslint-disable-next-line func-call-spacing
export const ThemeDispatchContext = createContext<undefined | React.Dispatch<React.SetStateAction<"dark" | "light">>>(undefined);

const [themeMode, dispatch] = useState<"dark" | "light">("dark");

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
