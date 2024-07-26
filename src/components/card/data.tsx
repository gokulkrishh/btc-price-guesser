type DataCardProps = {
  title: string;
  value: string | null;
};

export default function DataCard({ title, value }: DataCardProps) {
  return (
    <div className="flex flex-col relative gap-1 bg-zinc-100 w-full p-3 rounded-xl">
      <h3 className="font-medium text-zinc-700">{title}</h3>
      <span className="text-2xl font-black">{value}</span>
    </div>
  );
}
