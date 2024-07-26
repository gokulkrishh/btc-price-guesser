import { generateClient } from 'aws-amplify/data';
import type { Schema } from 'amplify/data/resource';

import { DataItem } from 'types/data';
import { useData } from 'contexts/data';
import { limits } from 'constants/index';
import Timer from './timer';
import { usePrice } from 'contexts/price';
import { DownArrowIcon, UpArrowIcon } from './icons';

const client = generateClient<Schema>();

const { SIXTY_SECONDS } = limits;

type GuessActionType = 'up' | 'down';

export default function Guess() {
  const { data } = useData();
  const { data: priceData, triggerFetch } = usePrice();
  const currentGuess = data.at(0);
  const isGuessing = currentGuess && currentGuess?.resolved !== true;

  const createGuess = async (guess: GuessActionType) => {
    try {
      const newGuess = {
        guess,
        score: currentGuess?.score,
        initialPrice: priceData?.price,
      } as DataItem;
      await client.models.Data.create(newGuess, {
        authMode: 'userPool',
      });
    } catch (error) {
      console.error('Error', error);
    }
  };

  const updateGuess = async () => {
    try {
      let correct = true;
      let score = currentGuess?.score ?? 0;
      const isUp = currentGuess?.guess === 'up';
      const isDown = currentGuess?.guess === 'down';
      const lastestPrice = priceData && priceData.price;

      if (isUp && lastestPrice && lastestPrice > currentGuess.initialPrice) {
        score++;
      } else if (
        isDown &&
        lastestPrice &&
        lastestPrice < currentGuess.initialPrice
      ) {
        score++;
      } else {
        correct = false;
        score--;
      }

      const newGuess = {
        id: currentGuess?.id,
        resolvedPrice: priceData?.price,
        correct,
        score,
        resolved: true,
      } as DataItem;
      await client.models.Data.update(newGuess, {
        authMode: 'userPool',
      });
    } catch (error) {
      console.error('Error', error);
    }
  };

  const handleClick = (guess: GuessActionType) => createGuess(guess);

  const handleTick = async (timeElapsed: number) => {
    if (timeElapsed > SIXTY_SECONDS) {
      //TODO: handle this better like a queue or is it ok to keep polling
      await triggerFetch();
      if (priceData?.price !== currentGuess?.initialPrice) {
        updateGuess();
      }
    }
  };

  return (
    <div className="flex flex-col relative gap-1 mt-8 bg-orange-50 w-full p-3 rounded-xl">
      <h3 className="font-bold text-lg text-center text-zinc-700">
        Will the price go UP or DOWN in next minute?
      </h3>
      <div className="flex items-center mt-2 justify-center gap-4">
        <button
          disabled={isGuessing}
          onClick={() => {
            if (!isGuessing) {
              handleClick('up');
            }
          }}
          className="inline-flex items-center justify-center whitespace-nowrap text-sm ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 hover:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 disabled:pointer-events-none bg-zinc-900 text-white hover:bg-zinc-900/90 shadow-sm disabled:opacity-50 h-9 rounded-xl px-3 font-medium"
        >
          <UpArrowIcon className="text-white mr-0.5" /> Up
        </button>
        <button
          disabled={isGuessing}
          onClick={() => {
            if (!isGuessing) {
              handleClick('down');
            }
          }}
          className="inline-flex items-center justify-center whitespace-nowrap text-sm ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 hover:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 disabled:pointer-events-none bg-zinc-900 text-white hover:bg-zinc-900/90 shadow-sm disabled:opacity-50 h-9 rounded-xl px-3 font-medium"
        >
          <DownArrowIcon className="text-white mr-0.5" /> Down
        </button>
      </div>

      {isGuessing ? <Timer data={currentGuess} onTick={handleTick} /> : null}
    </div>
  );
}
