import assets from "@/assets";


const Hero = () => {
  return (
    <div className='flex justify-center items-center '>
      <img loading='lazy' src={assets.images.banner} alt="" className='bg-cover bg-center'/>
    </div>
  );
};

export default Hero;