import { ThemeProvider } from "./hooks/useTheme";
import { Terminal } from "./components/Terminal";

const App = () => {
  return (
    <ThemeProvider>
      <Terminal />
    </ThemeProvider>
  );
};

export default App;