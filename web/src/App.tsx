import { BrowserRouter, Route, Routes } from "react-router-dom";
// import EnvironmentInfo from "./components/environment-info/EnvironmentInfo";
import { Header } from "./components/header/Header";
import { Home } from "./home/Home";
import { Info } from "./info/Info";
import { useEffect, useState } from "react";
import { requestAedData } from "./services/aed-data.service";

export const App = () => {
  const [aedData, setAedData] = useState<any>(null);

  useEffect(() => {
    const initData = async () => {
      const response = await requestAedData();
      setAedData(response);
    };
    initData();
  }, []);

  return (
    <div className="App">
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home data={aedData} />} />
          <Route path="/info" element={<Info />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};
