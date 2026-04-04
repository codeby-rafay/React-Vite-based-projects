import ThemeBtn from "./components/ThemeBtn";
import Card from "./components/Card";
import { ThemeProvider } from "./context/theme";
import { useEffect, useState } from "react";

const App = () => {
  const [themeMode, setThemeMode] = useState("light");

  const darkTheme = () => {
    setThemeMode("dark");
  };

  const lightTheme = () => {
    setThemeMode("light");
  };

  useEffect(() => {
    document.querySelector("html").classList.remove("light", "dark");
    document.querySelector("html").classList.add(themeMode);
  }, [themeMode]);

  return (
    <ThemeProvider value={{ themeMode, darkTheme, lightTheme }}>
      <div className="h-screen bg-linear-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300 flex flex-col items-center justify-center p-4 overflow-hidden">
        <div className="w-full max-w-sm">
          <div className="flex justify-between items-center gap-4 mb-8">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Product
              </h1>
            </div>
            <ThemeBtn />
          </div>

          <div className="transform transition-all duration-300 hover:scale-105">
            <Card />
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default App;
