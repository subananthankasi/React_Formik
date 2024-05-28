
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
// import Create from './formik/Create';
// import Read from './formik/Read';
// import Update from './formik/Update';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'primeicons/primeicons.css';
import 'primereact/resources/primereact.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';

import Create1 from './testformik/Create1';
import Read1 from './testformik/Read1';
import Update1 from './testformik/Update1';

function App() {
  return (
    <>
    {/* <BrowserRouter>
    <Routes>
      <Route path='/' element ={<Create/>} />
      <Route path='/read' element ={<Read/>} />
      <Route path='/update' element ={<Update/>} />
    </Routes>
    </BrowserRouter> */}

    <BrowserRouter>
    <Routes>
      <Route path='/' element ={<Create1/>} />
      <Route path='/read1' element ={<Read1/>} />
      <Route path='/update1' element ={<Update1/>} />
    </Routes>
    </BrowserRouter>
  
    </>
  );
}

export default App;
