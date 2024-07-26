import DataCardSkeleton from './data';

export default function StatsSkeleton() {
  return (
    <div className="flex gap-4 mt-10">
      <DataCardSkeleton />
      <DataCardSkeleton className="border-2" />
    </div>
  );
}
