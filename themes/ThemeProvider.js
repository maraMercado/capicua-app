import { lightColors, darkColors } from "./colors";
import { useColorScheme } from "react-native";
import React, { createContext, useContext, useEffect, useState } from "react";
import { setScheme } from "./setScheme";


export const ThemeContext = createContext({
    dark: false,
    colors: lightColors,
    setScheme
})

export const ThemeProvider = (props) => {
    let colorScheme;
    colorScheme = useColorScheme(colorScheme == "dark");
    const [isDark, setIsDark] = useState(colorScheme == "dark");

    useEffect(()=>{
        setIsDark(colorScheme == "dark");
    },[colorScheme])

    const defaultTheme = {
        dark: isDark,
        colors: isDark ? darkColors : lightColors,
        setScheme: (scheme)=>setIsDark(scheme === "dark")
    }
    return (
        <ThemeContext.Provider  value={defaultTheme}>
            {props.children}
        </ThemeContext.Provider>
    )
}

export const useTheme = ()=>useContext(ThemeContext)