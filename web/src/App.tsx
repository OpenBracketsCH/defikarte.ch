import { BrowserRouter, Route, Routes } from "react-router-dom";
// import EnvironmentInfo from "./components/environment-info/EnvironmentInfo";
import { Header } from "./components/header/Header";
import { Home } from "./home/Home";

const App = () => {
  return (
    <div className="App">
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
