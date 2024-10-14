import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  const handleButtonClick = (event) => {
    event.preventDefault();
    navigate("/usage");
  };

  return (
    <section className="flex items-center justify-center min-h-screen pt-16">
      <div className="relative items-center w-full px-5 py-12 mx-auto md:px-12 lg:px-16 max-w-7xl lg:py-24">
        <div className="flex w-full mx-auto text-left">
          <div className="relative inline-flex items-center mx-auto align-middle">
            <div className="text-center">
              <h1 className="max-w-5xl text-2xl font-bold leading-none tracking-tighter text-white md:text-5xl lg:text-6xl lg:max-w-7xl">
                Build Your Perfect PC <br className="hidden lg:block"></br>
                Tailored Just for You!
              </h1>
              <p className="max-w-xl mx-auto mt-8 text-base leading-relaxed text-white">
                Looking to build a new PC? Our app helps you navigate through
                the options and recommends the ideal parts for your budget and
                specific use case. Whether you’re gaming, streaming, or working,
                we’ve got you covered.<br></br>Start building your ideal setup
                today!
              </p>
              <div className="flex justify-center w-full max-w-2xl gap-2 mx-auto mt-6">
                <div className="mt-3 rounded-lg sm:mt-0">
                  <button
                    onClick={handleButtonClick}
                    className="px-5 py-4 text-base text-center text-black font-semibold transition duration-500 ease-in-out transform bg-white lg:px-10 rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Start Your Build
                  </button>
                </div>
                {/* <div className="mt-3 rounded-lg sm:mt-0 sm:ml-3">
                        <button className="items-center block px-5 lg:px-10 py-3.5 text-base font-medium text-center text-blue-600 transition duration-500 ease-in-out transform border-2 border-white shadow-md rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">See features</button>
                        </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
