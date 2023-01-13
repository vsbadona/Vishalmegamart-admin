import { BrowserRouter as Router , Routes ,Route } from "react-router-dom";
import Addproduct from "./Components/Addproduct";
import Header from "./Components/Header";
import Home from "./Components/Home";
import Products from "./Components/Products";
import Categories from "./Components/Categories";
import Contact from "./Components/Contact";
import Shortcut from "./Components/Shortcut";
import Slider from "./Components/Slider";
function App() {
  return (
 <>
 <Router>
 <Header/>
  <Routes>
 <Route path="/" element={<Home/>}></Route>
 <Route path="Product" element={<Products/>}></Route>
 <Route path="Addproduct" element={<Addproduct/>}></Route>
 <Route path="Category" element={<Categories/>}></Route>
 <Route path="Contact" element={<Contact/>}></Route>
 <Route path="Shortcut" element={<Shortcut/>}></Route>
 <Route path="Slider" element={<Slider/>}></Route>
  </Routes>
 </Router>
 </>
  );
}

export default App;
