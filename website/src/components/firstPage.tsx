const FirstPage = () => (
  <section
    id="home"
    className="relative h-screen flex flex-col items-center justify-end text-center pb-21 md:pb-10"
  >
    <div className="backdrop-blur-xl bg-black/30 border border-white/20 rounded-2xl p-4  shadow-2xl max-w-md w-full">
      <h2 className="text-3xl md:text-4xl font-extrabold text-gray-300 drop-shadow-lg">
        GUEZO Loïc
      </h2>
      <p className="text-lg md:text-2xl text-gray-200 mt-2">
        IT Student
      </p>
    </div>
  </section>
);

export default FirstPage;