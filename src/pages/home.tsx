import Guess from 'components/guess';
import GuessHistory from 'components/guess-history';
import Header from 'components/header';
import Stats from 'components/stats';

export default function Home() {
  return (
    <div className="flex p-2 px-4 min-h-full flex-col w-full md:max-w-lg md:p-2 m-auto">
      <Header />
      <main className="flex h-full flex-col w-full">
        <Stats />
        <Guess />
        <GuessHistory />
      </main>
    </div>
  );
}
