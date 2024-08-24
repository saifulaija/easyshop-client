// import { Card } from "@/components/ui/card";
// import { TData } from "./SubHero";

// // Props interface

// // SubHeroCard component
// const SubHeroCard = ({ item }: { item: TData }) => {
//   return (
//     <div>
//       <Card
//         className={`p-2 md:p-10  group hover:bg-primary/5 transition-all duration-75`}
//       >
//         <div className="flex justify-between items-center gap-2">
//           <img
//             src={item.icon}
//             alt={item.title}
//             width={40}
//             height={40}
//             className="group-hover:scale-90 transition-all duration-75"
//           />
//           <div>
//             <p className="font-semibold text-gray-500">{item.title}</p>
//             <p className="font-semibold text-gray-500">{item.quantity}</p>
//           </div>
//         </div>
//       </Card>
//     </div>
//   );
// };

// export default SubHeroCard;



import { Card } from "@/components/ui/card";
import { TData } from "./SubHero";
import { cn } from "@/lib/utils";

interface SubHeroCardProps {
  item: TData;
}

const SubHeroCard = ({ item }: SubHeroCardProps) => {
  return (
    <Card
      className={cn(
        "p-2 md:p-10  group transition-all duration-75 ease-in-out"
      )}
    >
      <div className="flex items-center gap-4">
        <img
          src={item.icon}
          alt={item.title}
          width={40}
          height={40}
          className="transform group-hover:scale-105 transition-transform duration-150 ease-in-out"
        />
        <div className="flex-1">
          <p className="text-lg font-semibold text-gray-700 group-hover:text-primary transition-colors duration-150">
            {item.title}
          </p>
          <p className="text-sm font-medium text-gray-500">
            {item.quantity.toLocaleString()}
          </p>
        </div>
      </div>
    </Card>
  );
};

export default SubHeroCard;

