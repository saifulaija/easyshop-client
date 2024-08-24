"use client";

import assets from "@/assets";
const Hero = () => {
  return (
    <div className="w-full relative rounded-b-md">
      <img
        src={assets.images.dashboard}
        width={0}
        height={0}
        sizes="100vw"
        alt="banner"
        style={{ width: "100%", height: "auto" }}
      />
      {/* Container for centering the button */}
    </div>
  );
};

export default Hero;
