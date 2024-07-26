import { usePrice } from 'contexts/price';
import DataCard from './card/data';
import { useData } from 'contexts/data';
import { formatCurrency } from 'utils';

export default function Stats() {
  const { data } = usePrice();
  const { data: userData } = useData();
  const currentGuess = userData.at(0);

  return (
    <div className="flex gap-4 mt-10">
      <DataCard title={'BTC/USD'} value={formatCurrency(data?.price ?? 0)} />
      <DataCard
        className="border-2"
        title={'Current Score'}
        value={currentGuess?.score ?? 0}
      />
    </div>
  );
}
