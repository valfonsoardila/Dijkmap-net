import "./App.css";
import Layout from "./components/app/layout/Layout";
import { GlobalStateProvider } from "./hooks/GlobalStateContext";

function App() {
  return (
    <div className="App">
      <GlobalStateProvider>
        <Layout />
      </GlobalStateProvider>
    </div>
  );
}

export default App;
