import { Outlet, Link } from "react-router-dom";
import reactLogo from './assets/react.svg';
import './App.css';

export default function App() {
  return (
    <div className="container">
      <header>
        <h1>Contact Book</h1>
        <nav>
          <Link to="/">Home</Link> | <Link to="/new">Add Contact</Link>
        </nav>
      </header>

      <div className="App">
        <div>
          <a href="https://vitejs.dev" target="_blank" rel="noopener noreferrer">
            <img src="/vite.svg" className="logo" alt="Vite logo" />
          </a>
          <a href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
            <img src={reactLogo} className="logo react" alt="React logo" />
          </a>
        </div>
      </div>
      <Outlet />
    </div>
  );
}
