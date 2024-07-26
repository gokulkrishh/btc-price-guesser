import { useEffect, useRef, useState } from 'react';
import { DataItem } from 'types/data';
import { getElapsedTime } from 'utils';

type TimerProps = {
  timeStamp: DataItem['createdAt'];
  onTick: (timeElapsed: number) => void;
};

export default function Timer({ timeStamp, onTick }: TimerProps) {
  const timeElapsed = getElapsedTime(timeStamp);
  const [elapsedTime, setElapsedTime] = useState(timeElapsed);
  const timerRef = useRef<ReturnType<typeof setTimeout> | undefined>();

  useEffect(() => {
    if (timeStamp) {
      const createdAtTime = new Date(timeStamp).getTime() + 1000;
      timerRef.current = setInterval(() => {
        const currentTime = new Date().getTime();
        const timeElapsed = Math.floor((currentTime - createdAtTime) / 1000);
        setElapsedTime(timeElapsed);
        onTick(timeElapsed);
      }, 1000);
    }

    return () => {
      clearInterval(timerRef.current);
    };
  }, [timeStamp, onTick]);

  return (
    <div className="flex flex-col items-center tabular-nums text-lg font-medium justify-center mt-2">
      Time Elapsed: {Math.max(1, Math.floor(elapsedTime))}{' '}
      {elapsedTime <= 1 ? 'second' : 'seconds'}
    </div>
  );
}
