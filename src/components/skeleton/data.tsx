export default function DataCardSkeleton({
  className,
}: {
  className?: string;
}) {
  return (
    <div
      className={`flex flex-col gap-1 bg-zinc-100 w-full p-3 rounded-xl ${className}`}
    />
  );
}
