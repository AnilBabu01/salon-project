import { useEffect, useState } from "react";

const CountdownTimer: React.FC<{ minutes: number, seconds: number; reset?: number; }> = ({ minutes, seconds }) => {
  const [timeLeft, setTimeLeft] = useState(minutes * 60 + seconds);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [timeLeft]);

  const formatTime = (time: number) => {
    const mins = String(Math.floor(time / 60)).padStart(2, '0');
    const secs = String(time % 60).padStart(2, '0');
    return `${mins}:${secs}`;
  };

  return (
    <div
      style={{
        color: timeLeft <= 20 ? 'red' : 'black',
        fontWeight: timeLeft <= 20 ? 'bold' : 'normal',
      }}
    >
      {timeLeft > 0 ? formatTime(timeLeft) : 'Time Expired'}
    </div>
  );
};

export default CountdownTimer;