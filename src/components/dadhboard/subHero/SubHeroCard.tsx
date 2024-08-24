
import { Card } from "@/components/ui/card";
import { TData } from "./SubHero";


// Props interface

// SubHeroCard component
const SubHeroCard = ({ item }: { item: TData }) => {
  return (
    <div>
      <Card className={`p-2 md:p-10  group`}>
        <div className="flex justify-between items-center gap-6">
          <img
            src={item.icon}
            alt={item.title}
            width={40}
            height={40}
            className="group-hover:scale-90 transition-all duration-75"
          />
          <p className="font-semibold">{item.title}</p>
        </div>
      </Card>
    </div>
  );
};

export default SubHeroCard;
