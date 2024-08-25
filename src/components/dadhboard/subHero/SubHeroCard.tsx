
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

