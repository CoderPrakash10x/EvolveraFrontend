import { Link } from "react-router-dom"
const Hero = () => {
  return (
    <section className="relative min-h-screen bg-black font-poppins">

      {/* ===== Background Layers ===== */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[#120700] via-black to-black" />

      <div className="absolute -top-40 -left-40 w-[420px] h-[420px] md:w-[600px] md:h-[600px]
        bg-orange-500/20 rounded-full blur-[160px] animate-pulse" />

      <div className="absolute bottom-[-180px] right-[-180px] w-[420px] h-[420px] md:w-[700px] md:h-[700px]
        bg-orange-600/10 rounded-full blur-[180px] animate-pulse delay-1000" />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.04),transparent_45%)] -z-10" />

      {/* ===== Content Wrapper ===== */}
      <div className="relative min-h-screen flex items-center overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 pt-32 pb-28 md:pt-24 md:pb-0
          grid grid-cols-1 md:grid-cols-2 gap-20 items-center">

          {/* ===== LEFT CONTENT ===== */}
          <div className="text-center md:text-left">

            <div className="inline-block mb-6 animated-border">
              <div className="px-5 py-1 rounded-full bg-black/80 text-xs sm:text-sm
                text-gray-300 backdrop-blur font-medium tracking-wide">
                Innovate • Collaborate • Elevate
              </div>
            </div>

            <h1 className="text-white text-3xl sm:text-4xl md:text-6xl
              font-bold tracking-tight leading-[1.1]">
              Welcome to <br />
              <span className="text-orange-500">EVOLVERA CLUB</span>
            </h1>

            <p className="mt-5 text-gray-300 max-w-xl mx-auto md:mx-0
              text-sm sm:text-base font-normal leading-relaxed">
              Evolvera is the official technical club of KIPM – College of
              Engineering and Technology, where innovators collaborate to build
              real-world projects and explore emerging technologies.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">

              <Link to='/contact'>
                <button className="px-8 py-3 rounded-full bg-orange-500 text-black
                font-semibold tracking-wide
                shadow-[0_0_30px_rgba(255,165,0,0.45)]
                hover:shadow-[0_0_50px_rgba(255,165,0,0.7)]
                hover:scale-105 transition-all duration-300">
                  Join Us
                </button>
              </Link>
              <Link to="/events">
                <button className="group relative px-8 py-3 rounded-full
                border border-white/30 text-white
                font-medium tracking-wide overflow-hidden
                hover:border-orange-500 transition-all duration-300">

                  <span className="relative z-10 flex items-center gap-2 justify-center">
                    Explore Events <span className="group-hover:translate-x-2 transition">→</span>
                  </span>

                  <span className="absolute inset-0 bg-orange-500/10 translate-y-full
                  group-hover:translate-y-0 transition-transform duration-300" />
                </button>
              </Link>
            </div>
          </div>

          {/* ===== RIGHT ORB ===== */}
          <div className="relative flex justify-center items-center mt-16 md:mt-0 mb-20 md:mb-0">

            <div className="absolute w-56 h-56 sm:w-64 sm:h-64 md:w-96 md:h-96
              rounded-full bg-orange-500/20 blur-[120px]" />

            <div className="absolute w-52 h-52 sm:w-60 sm:h-60 md:w-80 md:h-80
              rounded-full border border-orange-500/30
              animate-[spinSlow_20s_linear_infinite]" />

            <div className="w-44 h-44 sm:w-52 sm:h-52 md:w-72 md:h-72 rounded-full
              bg-gradient-to-br from-orange-500 via-orange-400 to-orange-600
              shadow-[0_0_80px_rgba(255,165,0,0.6)]
              animate-[float_6s_ease-in-out_infinite]" />

          </div>
        </div>
      </div>

      {/* ===== Floating Objects ===== */}
      <div className="hidden md:block absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute left-16 top-40 w-14 h-14
          border-2 border-orange-500/60 rounded-full animate-floatSlow" />
      </div>

    </section>
  );
};

export default Hero;
