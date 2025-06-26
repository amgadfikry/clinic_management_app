import {
  useState, useEffect
} from '../import'

function ComingSoon() {
  const calculateTimeLeft = () => {
    const difference = +new Date(`12/31/2024`) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearTimeout(timer);
  });


  return (
    <div className='relative flex-1 container mx-auto py-10 px-4 flex flex-col justify-center items-center'>
      <h1 className='text-center text-teal-color text-2xl font-bold mb-5'>Coming Soon!</h1>
      <div className='flex space-x-2' >
        <div className='flex flex-col justify-center items-center'>
          <p className='px-4 py-4 border border-teal-color text-3xl font-blod text-teal-color
          rounded-lg'>{String(timeLeft.days).padStart(2, '0')}</p>
          <p className='text-teal-color'>Days</p>
        </div>
        <div className='flex flex-col justify-center items-center'>
          <p className='px-4 py-4 border border-teal-color text-3xl font-blod text-teal-color
          rounded-lg'>{String(timeLeft.hours).padStart(2, '0')}</p>
          <p className='text-teal-color'>Hours</p>
        </div>
        <div className='flex flex-col justify-center items-center'>
          <p className='px-4 py-4 border border-teal-color text-3xl font-blod text-teal-color
          rounded-lg'>{String(timeLeft.minutes).padStart(2, '0')}</p>
          <p className='text-teal-color'>Mins</p>
        </div>
        <div className='flex flex-col justify-center items-center'>
          <p className='px-4 py-4 border border-teal-color text-3xl font-blod text-teal-color
          rounded-lg'>{String(timeLeft.seconds).padStart(2, '0')}</p>
          <p className='text-teal-color'>Secs</p>
        </div>
      </div>
    </div>
  );
}

export default ComingSoon