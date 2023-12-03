import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
const MainPage = () => {
  // Animation variants
  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const fadeInRight = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Hero Section */}
      <section className="bg-green-600 text-white py-16 mt-12">
        <div className="container mx-auto text-center">
          <motion.h2
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="text-4xl font-semibold mb-4"
          >
            Elevate Your Brand with MilliMetre
          </motion.h2>
          <motion.p
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="text-lg mb-8"
          >
            sell your products with us
          </motion.p>
          <motion.a
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            href="#"
            className="bg-white text-green-600 py-3 px-8 rounded-full text-lg hover:bg-green-800 hover:text-white transition duration-300 ease-in-out"
          >
            Get Started
          </motion.a>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto w-[95%] text-center">
          <motion.h2
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="text-3xl font-semibold mb-8"
          >
            Why MilliMetre?
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeInRight}
              className="p-4 border border-gray-300 rounded-lg hover:shadow-md transition duration-300 ease-in-out"
            >
              <h3 className="text-xl font-semibold mb-4">Wide Reach</h3>
              <p className="text-gray-600">
                Connect with influencers with a wide audience reach.
              </p>
            </motion.div>
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeInRight}
              className="p-4 border border-gray-300 rounded-lg hover:shadow-md transition duration-300 ease-in-out"
            >
              <h3 className="text-xl font-semibold mb-4">
                Effective Marketing
              </h3>
              <p className="text-gray-600">
                Boost your brand's marketing efforts with influencer
                partnerships.
              </p>
            </motion.div>
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeInRight}
              className="p-4 border border-gray-300 rounded-lg hover:shadow-md transition duration-300 ease-in-out"
            >
              <h3 className="text-xl font-semibold mb-4">Engagement</h3>
              <p className="text-gray-600">
                Drive engagement and interaction with your target audience.
              </p>
            </motion.div>
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeInRight}
              className="p-4 border border-gray-300 rounded-lg hover:shadow-md transition duration-300 ease-in-out"
            >
              <h3 className="text-xl font-semibold mb-4">Data-Driven</h3>
              <p className="text-gray-600">
                Access valuable data and insights for informed decisions.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-green-600 text-white py-16">
        <div className="container mx-auto text-center">
          <motion.h2
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="text-4xl font-semibold mb-4"
          >
            Join MilliMetre Today and Grow Your Brand!
          </motion.h2>
          <motion.p
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="text-lg mb-8"
          >
            Connect with influencers and take your brand to new heights.
          </motion.p>
          <Link to="/brand-signup">
            <motion.a
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              href="#"
              className="bg-white text-green-600 py-3 px-8 rounded-full text-lg hover:bg-green-800 hover:text-white transition duration-300 ease-in-out"
            >
              Sign Up Now
            </motion.a>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white py-4 shadow-md">
        <div className="container mx-auto text-center">
          <p className="text-gray-600">
            &copy; {new Date().getFullYear()} MilliMetre. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default MainPage;
