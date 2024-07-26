import Header from 'components/header';
import GuessSkeleton from './guess';
import GuessHistorySkeleton from './history';
import StatsSkeleton from './stats';

export default function HomeSkeleton() {
  return (
    <div className="flex p-2 px-4 min-h-full flex-col w-full md:max-w-lg md:p-2 m-auto">
      <Header />
      <main className="flex h-full flex-col w-full">
        <StatsSkeleton />
        <GuessSkeleton />
        <div className="flex flex-col gap-4 mt-8">
          <h3 className="font-bold text-lg text-zinc-700">History (0)</h3>
          <GuessHistorySkeleton count={3} />
        </div>
      </main>
    </div>
  );
}
