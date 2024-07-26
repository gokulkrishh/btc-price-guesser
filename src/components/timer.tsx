import { useEffect, useRef, useState } from 'react';
import { DataItem } from 'types/data';

type TimerProps = {
  data: DataItem;
  onTick: (timeElapsed: number) => void;
};

export default function Timer({ data, onTick }: TimerProps) {
  const currentTime = new Date().getTime();
  const createdAtTime = new Date(data.createdAt).getTime();
  const timeElapsed = Math.floor((currentTime - createdAtTime) / 1000);
  const [elapsedTime, setElapsedTime] = useState(timeElapsed);
  const timerRef = useRef<ReturnType<typeof setTimeout> | undefined>();

  useEffect(() => {
    if (data?.createdAt) {
      const createdAtTime = new Date(data.createdAt).getTime();
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
    <div className="flex items-center justify-center mt-2">
      Time Elapsed: {Math.floor(elapsedTime)} seconds
    </div>
  );
}
