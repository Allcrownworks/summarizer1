import Demo from "./Component/Demo";
import Hero from "./Component/Hero";
import "./index.css";
const App = () => {
  return (
    <div>
      <div className="main">
        <div className="gradient"/>
      </div>
      <div className="app font-orbitron">
        <Hero />
        <Demo />
      </div>
   
    </div>
  )
}

export default App
