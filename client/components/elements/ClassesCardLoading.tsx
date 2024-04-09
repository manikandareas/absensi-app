import { Skeleton } from "../ui/skeleton";

const Load = () => {
  return (
    <Skeleton className="h-[180px] flex-grow rounded-lg md:w-[320px]"></Skeleton>
  );
};
const ClassesCardsLoading = () => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {Array(7)
        .fill(0)
        .map((_, idx) => (
          <Load key={idx} />
        ))}
    </div>
  );
};

export default ClassesCardsLoading;
