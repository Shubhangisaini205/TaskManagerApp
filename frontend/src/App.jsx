import "./App.css";
import Navbar from "./components/organisms/Navbar";
import AllRoutes from "./routes/AllRoutes";

function App() {
  return (
    <div className="App">
      <Navbar />
      <AllRoutes />
    </div>
  );
}

export default App;
