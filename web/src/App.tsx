import React from "react";
import { Route, Routes } from "react-router";
import Map from "./modules/map/Map";

const App: React.FC = () => {
  return (
    <div className="h-screen">
      <Routes>
        <Route path="/" element={<Map />} />
      </Routes>
    </div>
  );
};

export default App;
