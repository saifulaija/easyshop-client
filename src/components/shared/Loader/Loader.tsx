import { Loader2 } from "lucide-react";


const Loader = () => {
  return (
    <div className="flex justify-center items-center ">
      <Loader2 className="h-7 w-7 animate-spin text-gray-400"></Loader2>
    </div>
  );
};

export default Loader;
