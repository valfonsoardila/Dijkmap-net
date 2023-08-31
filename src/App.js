import './App.css';
import Layout from './components/app/layout/Layout';
import MapView from './components/map/MapView';
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
