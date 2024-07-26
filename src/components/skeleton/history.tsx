export default function GuessHistorySkeleton({ count }: { count: number }) {
  return Array.from({ length: count })
    .fill(0)
    .map((_, index) => (
      <div
        key={index}
        className="rounded-xl h-[102px] flex gap-1 px-4 p-3 flex-col animate-pulse bg-zinc-100 border w-full"
      />
    ));
}
