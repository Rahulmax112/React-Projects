
import {BrowserRouter  as Router, Routes, Route} from "react-router-dom"
import Header from "./components/Header";
import Home from "./components/Home";
import Coin from "./components/Coins";
import CoinDetails from "./components/CoinDetails";
import Exchanges from "./components/Exchanges";
import { Box } from "@chakra-ui/react";

function App() {
  return (
    <Box className="App">
      <Router>
        <Header/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/coin" element={<Coin/>}/>
          <Route path="/coin/:id" element={<CoinDetails/>}/>
          <Route path="/exchanges" element={<Exchanges/>}/>
        </Routes>
      </Router>
    </Box>
  );
}

export default App;
