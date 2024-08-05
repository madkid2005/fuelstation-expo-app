import React, { createContext, useState } from 'react';

export const themes = {
  light: {
    background: '#ffffff',
    text: '#000000',
    buttonBackground: 'blue',
    buttonText: '#ff3333',
    headerBackground: '#ffffff',
    headerText: '#000000',
  },
  dark: {
    background: '#121212',
    text: '#ffffff',
    buttonBackground: 'blue',
    buttonText: '#000000',
    headerBackground: '#1e1e1e',
    headerText: '#ffffff',
  },
};

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(themes.light); // Set your default theme here

  const toggleTheme = () => {
    setTheme(theme === themes.light ? themes.dark : themes.light);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
