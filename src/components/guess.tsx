import { generateClient } from 'aws-amplify/data';
import type { Schema } from 'amplify/data/resource';
import { DataItem } from 'types/data';
import { isTimeLimitElapsed } from 'utils';
import { limits } from 'constants/index';
import { useData } from 'contexts/data';

const client = generateClient<Schema>();

type GuessActionType = 'up' | 'down';

const { SIXTY_SECONDS_IN_MILLI_SECOND } = limits;

export default function Guess() {
  const { data: allData } = useData();
  const data = allData?.at(-1) ?? [];

  const hasTimerElapsed = isTimeLimitElapsed(
    data.createdAt,
    SIXTY_SECONDS_IN_MILLI_SECOND,
  );

  console.log('hasTimerElapsed --->', hasTimerElapsed);

  const createGuess = async (guess: GuessActionType) => {
    try {
      const newGuess = { guess, initialPrice: 0 } as DataItem;
      await client.models.Data.create(newGuess);
    } catch (error) {
      console.error('Error', error);
    }
  };

  const handleClick = (guess: GuessActionType) => createGuess(guess);

  return (
    <div className="flex flex-col relative gap-1 mt-8 bg-orange-50 w-full p-3 rounded-xl">
      <h3 className="font-bold text-lg text-center text-zinc-700">
        Will the price go up or down in next minute or so?
      </h3>
      <div className="flex items-center mt-2 justify-center gap-4">
        <button
          onClick={() => handleClick('up')}
          className="inline-flex items-center justify-center whitespace-nowrap text-sm ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 disabled:pointer-events-none bg-zinc-900 text-white hover:bg-zinc-900/90 shadow-sm disabled:opacity-50 h-9 rounded-xl px-3 font-medium"
        >
          Up
        </button>
        <button
          onClick={() => handleClick('down')}
          className="inline-flex items-center justify-center whitespace-nowrap text-sm ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 disabled:pointer-events-none bg-zinc-900 text-white hover:bg-zinc-900/90 shadow-sm disabled:opacity-50 h-9 rounded-xl px-3 font-medium"
        >
          Down
        </button>
      </div>
    </div>
  );
}
