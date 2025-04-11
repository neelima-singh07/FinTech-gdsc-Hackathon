import React from 'react';
import heroImage from './White Blue Illustration Business Blog Banner.png'; // Update path if needed

const HeroSection = () => {
  return (
    <>
      

      {/* Hero Section */}
      <section className="bg-white h-[400px] px-6 lg:px-24 flex flex-col-reverse md:flex-row items-center justify-between gap-8">
        

        {/* Hero Image */}
        <div className="hero" style={{backgroundImage:"cover"}}>
          <img
            src={heroImage}
            alt="FinBuddy Finance Illustration"
            className="w-full max-w-xs drop-shadow-md"
          />
        </div>
      </section>
    </>
  );
};

export default HeroSection;

