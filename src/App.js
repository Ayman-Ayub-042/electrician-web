import { Route, Routes } from "react-router-dom";
import NavigationPanel from "./components/NavigationPanel";
import Container from "./components/Container";
import Header from "./components/Header";
import Settings from "./pages/Settings";
import "./styles/app.css";



import Videos from "./pages/Videos";
import Subcategory from "./pages/Subcategory";
import Residential from "./pages/Residential";
import Commercial from "./pages/Commercial";

function App(props) {
  return (
    <div className="app scroll-y">
      <NavigationPanel />
      <Container>
        <Header />
        <Routes>
          <Route exact path="/subcategory" element={<Subcategory id={props.id}  />} />
          <Route exact path="/videos" element={<Videos />} />
          <Route exact path="/residential" element={<Residential />} />
          <Route exact path="/commercial" element={<Commercial />} />
          <Route exact path="/settings" element={<Settings />} />
        </Routes>
      </Container>

      {/* container 
              -Header
              -Table
                  --Table Header
                  --Table Content
              -Footer
        */}
    </div>
  );
}

export default App;
