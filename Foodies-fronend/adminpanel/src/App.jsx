import "./App.css";
import Sidebar from "./components/Sidebar/Sidebar";
import FoodSection from "./components/FoodSection/FoodSection";
import MobileNav from "./components/MobileNav";
function App() {
  return (
    <>
      <div className="d-flex">
        <Sidebar />
        <div className="d-flex flex-column w-100">
          <FoodSection/>
        </div>
        <MobileNav/>
      </div>
    </>
  );
}

export default App;
