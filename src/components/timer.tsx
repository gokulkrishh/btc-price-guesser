import { useEffect, useRef, useState } from 'react';
import { DataItem } from 'types/data';
import { getElapsedTime } from 'utils';

type TimerProps = {
  data: DataItem;
  onTick: (timeElapsed: number) => void;
};

export default function Timer({ data, onTick }: TimerProps) {
  const timeElapsed = getElapsedTime(data?.createdAt);
  const [elapsedTime, setElapsedTime] = useState(timeElapsed);
  const timerRef = useRef<ReturnType<typeof setTimeout> | undefined>();

  useEffect(() => {
    if (data?.createdAt) {
      const createdAtTime = new Date(data.createdAt).getTime() + 1000;
      timerRef.current = setInterval(() => {
        const currentTime = new Date().getTime();
        const timeElapsed = Math.floor((currentTime - createdAtTime) / 1000);
        setElapsedTime(timeElapsed);
        onTick(timeElapsed);
      }, 1000);
    }

    return () => clearInterval(timerRef.current);
  }, [data, onTick]);

  return (
    <div className="flex items-center font-medium justify-center mt-2">
      Time Elapsed: {Math.max(1, Math.floor(elapsedTime))}{' '}
      {elapsedTime <= 1 ? 'second' : 'seconds'}
    </div>
  );
}
