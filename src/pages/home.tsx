import Guess from 'components/guess';
import GuessHistory from 'components/guess-history';
import Header from 'components/header';
import DataCard from 'components/card/data';
import { useData } from 'contexts/data';

export default function Home() {
  const { isLoading } = useData();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex p-2 px-4 min-h-full flex-col w-full md:max-w-lg md:p-2 m-auto">
      <Header />
      <main className="flex h-full flex-col w-full">
        <div className="flex gap-4 mt-10">
          <DataCard title={'BTC/USD'} value={'$100'} />
          <DataCard title={'Current Score'} value={'10'} />
        </div>
        <Guess />
        <GuessHistory />
      </main>
    </div>
  );
}
