import clsx from 'clsx';

type DataCardProps = {
  title: string;
  value: string | number | null | undefined;
  className?: string;
};

export default function DataCard({
  className = '',
  title,
  value,
}: DataCardProps) {
  return (
    <div
      className={clsx(
        'flex flex-col gap-1 bg-zinc-100 w-full p-3 rounded-xl',
        className,
      )}
    >
      <h3 className="font-medium text-zinc-700">{title}</h3>
      <span className="text-2xl font-black">{value}</span>
    </div>
  );
}
