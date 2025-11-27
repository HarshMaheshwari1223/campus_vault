import logo from './logo.svg';
import './App.css';
import { AuroraHero } from './Component/AuroraHero';
import Card from './Component/pick/Card';
import Example from './Component/pick/Example'
import {Mocc} from './Component/Mocc';
import { Comp } from './Component/Comp';
import { BrowserRouter,Route,Routes } from 'react-router-dom';
import Login from './Component/Login';
import SignUp from './Component/SignUp';
import { MoocTable } from './Component/MoocTable';
import Profile from './Component/Profile';
import { Plac } from './Component/Plac';
import { CompTable } from './Component/CompTable';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<AuroraHero />} />
        <Route path="/card" element={<Card />} />
        <Route path="/example" element={<Example />} />
        <Route path="/mocc" element={<Mocc />} />
        <Route path="/comp" element={<Comp />} />
        <Route path="/" element={<Login/>} />
        <Route path="/signup" element={<SignUp/>} />
        <Route path="/mooc-table" element={<MoocTable />} />
        <Route path="/comp-table" element={<CompTable />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/plac" element={<Plac />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
