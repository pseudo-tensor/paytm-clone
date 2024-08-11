// import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Signup, Signin } from './components/Auth.jsx';
import { Dashboard, SendMoney } from './components/Payments.jsx'
import { RecoilRoot } from 'recoil';

function App() {
  
  return (
    <RecoilRoot>
      <BrowserRouter>
        <Routes>
          <Route path = '/signup' element = { <Signup /> } />
          <Route path = '/signin' element = { <Signin /> } />
          <Route path = '/dashboard' element = { <Dashboard /> } />
          <Route path = '/send' element = { <SendMoney /> } />
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  )
}

export default App
