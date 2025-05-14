import "./App.css";
import Sidebar from "./components/Sidebar/Sidebar";
import Navbar from "./components/Navbar/Navbar";
import FoodSection from "./components/FoodSection/FoodSection";
function App() {
  return (
    <>
      <div className="d-flex">
        <Sidebar />
        <div className="d-flex flex-column w-100">
          <Navbar/>
          <FoodSection/>
        </div>
      </div>
    </>
  );
}

export default App;
