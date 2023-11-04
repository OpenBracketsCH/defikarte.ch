import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import EnvironmentInfo from "./components/environment-info/EnvironmentInfo";
import { useEffect, useState } from 'react';
import { Header } from './components/header/Header';
import { Home } from './modules/home/Home';
import { Info } from './modules/info/Info';
import { requestAedData } from './services/aed-data.service';
import { toGeoJson } from './services/geojson-convert.service';
import LinearProgress from './components/progress/linear-progress/LinearProgress';

export const App = () => {
  const [aedData, setAedData] = useState<any>(null);

  useEffect(() => {
    const initData = async () => {
      const response = await requestAedData();
      setAedData(toGeoJson(response));
    };
    initData();
  }, []);

  return (
    <div className="app-container">
      <Header />
      <LinearProgress indeterminate={!aedData} value={1} className="progress-bar mobile" />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home data={aedData} />} />
          <Route path="/info" element={<Info />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};
