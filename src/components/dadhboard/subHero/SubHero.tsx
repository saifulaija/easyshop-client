// SubHero.tsx
import assets from "@/assets";

import SubHeroCard from "./SubHeroCard";
import { useGetMetaDataQuery } from "@/redux/features/meta/metaApi";
import Loader from "@/components/shared/Loader/Loader";

// TData type definition
export type TData = {
  title: string;
  icon: string;
  quantity: number;
};

const SubHero = () => {
  const { data: meta, isLoading } = useGetMetaDataQuery({});

  // const icon: assets.subHero.upload;
  const data: TData[] = [
    {
      title: "Products",
      icon: assets.images.product,
      quantity: meta?.data?.totalProducts,
    },
    {
      title: "Orders",
      icon: assets.images.order,
      quantity: meta?.data?.totalOrders,
    },
    {
      title: "Sales",
      icon: assets.images.taka,
      quantity: `${meta?.data?.totalSeals}Tk`,
    },
    {
      title: "Customers",
      icon: assets.images.user,
      quantity: meta?.data?.totalCustomers,
    },
  ];

  if (isLoading) return <Loader />;
  return (
    <div className="grid grid-cols-1 gap-6 p-6 sm:grid-cols-2 lg:grid-cols-4 -mt-2">
      <>
        {data.map((item, index) => (
          <SubHeroCard key={index} item={item} />
        ))}
      </>
    </div>
  );
};

export default SubHero;
