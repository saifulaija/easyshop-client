import { Loader2 } from "lucide-react";

const Loader = () => {
  return (
    <div className="flex justify-center items-center h-full min-h-[50px]">
      <Loader2
        className="h-8 w-8 animate-spin text-gray-400"
        aria-label="Loading"
      />
    </div>
  );
};

export default Loader;
