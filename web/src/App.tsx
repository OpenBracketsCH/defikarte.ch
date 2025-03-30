import React from 'react';
import { Toaster } from 'react-hot-toast';
import { Route, Routes } from 'react-router';
import Map from './modules/map/Map';

const App: React.FC = () => {
  return (
    <div className="h-screen">
      <Toaster position="bottom-center" />
      <Routes>
        <Route path="/" element={<Map />} />
      </Routes>
    </div>
  );
};

export default App;
