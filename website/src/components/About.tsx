import React from "react";

const About: React.FC = () => {
  return (
    <section
      id="about"
      className="min-h-screen flex flex-col md:flex-row items-center justify-center px-6 md:px-24 py-10 gap-10 md:gap-16"
    >
      {/* Bloc texte */}
      <div className="md:w-1/2 flex flex-col space-y-6 md:space-y-8">
        {/* Bloc 1 */}
        <div className="text-center md:text-left">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Hi, I'm Loïc! 👋
          </h2>
          <p className="text-base md:text-lg text-gray-300 leading-relaxed">
            I'm passionate about <strong>low-level programming</strong> and love exploring how computers work at their core.
          </p>
        </div>

        {/* Bloc 2 */}
        <div className="text-center md:text-left">
          <p className="text-base md:text-lg text-gray-300 leading-relaxed">
            I enjoy working on <strong>embedded systems, retro computing, and electronics</strong>. From programming in <strong>assembly (NASM)</strong> and experimenting with the <strong>6502 processor</strong> using Ben Eater's kit, to building AI projects on the <strong>NVIDIA Jetson Nano</strong>. I thrive on diving deep into both <strong>hardware and software</strong>.
          </p>
        </div>

        {/* Bloc 3 */}
        <div className="text-center md:text-left">
          <p className="text-base md:text-lg text-gray-300 leading-relaxed">
            I'm always excited to take on <strong>new challenges</strong> and explore technologies in <strong>cybersecurity, full-stack development, machine learning</strong>, and beyond.
          </p>
        </div>
      </div>

      {/* Bloc image */}
      <div className="md:w-1/2 flex justify-center md:justify-end mt-6 md:mt-0">
        <img
          src="/images/guezoloic.png"
          alt="Loïc"
          className="w-40 h-40 md:w-64 md:h-64 rounded-full object-cover shadow-2xl border-4 border-white/20 transform transition-transform duration-500 hover:scale-105"
        />
      </div>
    </section>
  );
};

export default About;