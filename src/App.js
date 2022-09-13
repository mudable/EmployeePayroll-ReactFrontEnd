import './App.css';
import Form from './Components/Payroll-form'
import Home from './Components/Home'
import {Route,Routes} from 'react-router-dom'

function App() {
  return (
   <div>
    <Routes>
      <Route path="/home" element={<Home />}/>
      <Route path="/form" element={<Form />}/>
      <Route path="/Payroll-form/:id" element={<Form/>}/>
    
       </Routes>
   </div>

  );
}

export default App;
