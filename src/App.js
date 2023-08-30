import './App.css';
import Layout from './components/layout/Layout';
import MapView from './pages/map/MapView';
function App() {
  return (
    <div className="App">
      <Layout>
        <MapView/>
      </Layout>
    </div>
  );
}

export default App;
