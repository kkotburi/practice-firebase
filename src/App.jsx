import './App.css';
import Auth from './components/Auth';
import FileUpload from './components/FileUplod';
import Tils from './components/Tils';

const App = () => {
  return (
    <div className="App">
      <Auth />
      <Tils />
      <FileUpload />
    </div>
  );
};

export default App;
