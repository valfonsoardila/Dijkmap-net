import "./App.css";
// import Layout from "./components/app/layout/Layout";
import BaseRoutes from "./routes/BaseRoutes";
import { BrowserRouter as Router } from "react-router-dom";
import { GlobalStateProvider } from "./hooks/GlobalStateContext";

function App() {
  return (
    <div className="App">
      <GlobalStateProvider>
        <Router>
          <BaseRoutes />
        </Router>
      </GlobalStateProvider>
    </div>
  );
}

export default App;
