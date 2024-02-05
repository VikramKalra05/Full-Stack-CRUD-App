import Navbar from './components/navbar';
import './App.css';
import AllRoutes from './routes/AllRoutes';

function App() {
  return (
    <div className="App">
      <Navbar />
      <div className='main'>
        <AllRoutes />
      </div>
    </div>
  );
}

export default App;
