import { createTheme, ThemeProvider } from "@mui/material";
import React, { createContext, useMemo, useState } from "react";

/* 
  The below is essentially a passthrough Parent Prop, to provide 
  Light or Dark Mode, Global Context to Entire App.
*/


/* 
    You have to export the context, to Subscribe or Write to it
    Like useDispatch or useSelector
*/
export const ColorModeContext = createContext()
const ToggleColorMode = ({children}) => {
    const[mode, setMode] = useState("light")
    const toggleColorMode = () => {
        //* To prevent unwanted state changes, Passing Context is computationally expensive.
        setMode(prevMode => (prevMode == "light") ? "dark" : "light")
    }
    const theme = useMemo(() => createTheme({
        palette: {
          mode
        },
    }),[mode]);

  return (<>
  {/* Color Mode is the Global Context Provider Here */}
    <ColorModeContext.Provider value={{mode, setMode, toggleColorMode}}>
    {/* Theme is the Global Theme Provider, by Material UI */}
        <ThemeProvider theme={theme}>
         {children}
        </ThemeProvider>
    </ColorModeContext.Provider>
  </>)
};

export default ToggleColorMode;
