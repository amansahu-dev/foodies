import './App.css'
import FoodSection from './components/FoodSection/FoodSection'
import Menubar from './components/Menubar/Menubar'
function App() {
  return (
    <>
      <div className="d-flex flex-column w-100">
        <Menubar/>
        <FoodSection/> 
      </div>
    </>
  )
}

export default App
