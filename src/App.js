import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import {Auth} from "./pages/auth/index"
import { ExpenseTracker } from './pages/expense-tracker/indexET';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        {/* <Route path='/' exact element={<Auth/>}/>
        <Route path='/expense-tracker' element={ExpenseTracker}/> */}
        <Route path='/' Component={Auth}/>
        <Route path='/expense-tracker' Component={ExpenseTracker}/>
      </Routes>
      </BrowserRouter>
    
    </div>
  );
}

export default App;
