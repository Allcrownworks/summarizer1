import logo from "../assets/logo.png";

const Hero = () => {
  return (
    <>
      {/* Navbar section */}
      <nav className="flex w-full p-4 items-center justify-between bg-gray-100 fixed top-0 left-0 z-10">
        {/* Logo and Title */}
        <div className="flex items-center">
          <img src={logo} alt="logo" className="h-6 object-cover mr-2" />
          <h1 className="font-extrabold text-3xl  orange_gradient">Summarizer</h1>
        </div>

        {/* Button on the right */}
        <div>
          <button
            type="button"
            onClick={() => window.open("https://github.com/Allcrownworks/summarizer.git")}
            className="py-1 px-8 bg-orange-500 rounded-lg text-white"
          >
            Github
          </button>
        </div>
      </nav>

      {/* Section heading */}
      <section className="py-16 px-8 text-center mt-10">
        <h1 className="text-5xl font-bold mb-4 orange_gradient">Summarize Article With</h1>
        <span className="text-3xl text-gray-800">OpenAI GPT-4</span>
        <p className="text-xl p-6 font-serif text-gray-700">"Summarize lengthy articles in seconds with our AI-powered app. Simplify content into key points, saving time and effort while ensuring you capture the most important information from any text."</p>
      </section>
    </>
  );
};

export default Hero;
