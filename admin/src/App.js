import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import SideBar from "./components/sidebar/SideBar";
import Add from "./pages/Add/Add";
import List from "./pages/List/List";
import Orders from "./pages/Orders/Orders";
import { ToastContainer,toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'


function App() {
  return (
    <div className="App">
      <ToastContainer />
        <Navbar />
        <hr />
        <div className="app-content">
          <SideBar />
          <Routes>
            <Route path="/add" element={<Add />} />
            <Route path="/list" element={<List />} />
            <Route path="/orders" element={<Orders />} />
          </Routes>
        </div>

    </div>
  );
}

export default App;
