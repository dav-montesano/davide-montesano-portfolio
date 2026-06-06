import { useState, useEffect } from 'react';

export const CurrentDate = () => {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    // Update the date every minute to keep it reasonably fresh without over-rendering
    const timer = setInterval(() => {
      setDate(new Date());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  // Format: "Friday, 26 December 2025"
  const formattedDate = new Intl.DateTimeFormat('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date);

  return <span className="font-[Inter]">{formattedDate}</span>;
};
