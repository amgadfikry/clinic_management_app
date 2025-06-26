/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { BsStar, BsStarFill, BsStarHalf, useState } from '../import';

function InteractiveStars({ getStars, setStars, error }) {
  const [hover, setHover] = useState(0);

  const handleMouseOver = (index) => {
    setHover(index);
  };

  const handleMouseLeave = () => {
    setHover(0);
  };

  const handleClick = (index) => {
    setStars({ ...getStars, 'stars': index });
  };

  const stars = Array.from({ length: 5 }, (_, index) => {
    const starNumber = index + 1;
    return (
      <span
        key={index}
        onMouseOver={() => handleMouseOver(starNumber)}
        onMouseLeave={handleMouseLeave}
        onClick={() => handleClick(starNumber)}
      >
        {starNumber <= (hover || getStars.stars)
          ? <BsStarFill />
          : starNumber - 0.5 <= (hover || getStars.stars)
            ? <BsStarHalf />
            : <BsStar />}
      </span>
    );
  });

  return <div className='flex flex-col flex-1 flex-grow w-full items-center mt-0'>
    <div className='flex space-x-1 text-teal-color text-xl'>{stars}</div>
    <p className='text-[11px] text-red-500 pl-1 h-2 mt-1'>{error}</p>
  </div>
}

export default InteractiveStars;
