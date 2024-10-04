import Demo from "./Component/Demo";
import Hero from "./Component/Hero";
import "./index.css";

const App = () => {
  return (
    <div className="overflow-hidden w-full">
      <div className="main overflow-x-hidden w-full">
        <div className="gradient" />
      </div>
      <div className="app font-orbitron w-full">
        <Hero />
        <Demo />
      </div>
    </div>
  );
}

export default App;
