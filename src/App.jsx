import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Chat from './components/Chat/Chat';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/chat" element={<Chat />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
