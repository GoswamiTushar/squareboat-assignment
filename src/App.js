import { BrowserRouter } from 'react-router-dom';
import Navbar from 'components/Navbar'
import DarkBG from 'components/DarkBG'
import Routes from './routes'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar/>
        <DarkBG/>
        <Routes/>
      </BrowserRouter>
    </div>
  );
}

export default App;
