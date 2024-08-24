// SubHero.tsx
import assets from "@/assets";

import SubHeroCard from "./SubHeroCard";
import { useGetMetaDataQuery } from "@/redux/features/meta/metaApi";

// TData type definition
export type TData = {
  title: string;
  icon: string;
  color: string;
};

const SubHero= () => {
const{data:meta,isLoading}=useGetMetaDataQuery({})
console.log(meta);



  // const icon: assets.subHero.upload;
  const data: TData[] = [
    {
      title: "Discover Available Flats",
      icon: assets.images.product,
      color: "purple-500",
    },
    {
      title: "Subscribe for New Listings",
      icon: assets.images.product,
      color: "#ff8c00",
    },
    {
      title: "Engage with the Community",
      icon: assets.images.product,
      color: "#00bfff",
    },
    {
      title: "User-Friendly Booking",
      icon: assets.images.product,
      color: "#32cd32",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-6 p-6 sm:grid-cols-2 lg:grid-cols-4 -mt-2">
      {data.map((item, index) => (
        <SubHeroCard key={index} item={item} />
      ))}
    </div>
  );
};

export default SubHero;
