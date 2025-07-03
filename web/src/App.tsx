import React from 'react';
import { Toaster } from 'react-hot-toast';
import { Route, Routes } from 'react-router';
import { Map } from './modules/map/Map';

const App: React.FC = () => {
  return (
    <div className="h-screen">
      <Toaster
        position="top-right"
        containerStyle={{ zIndex: 10005 }}
        containerClassName="top-6 right-6"
      />
      <Routes>
        <Route path="/" element={<Map />} />
      </Routes>
    </div>
  );
};

export default App;
