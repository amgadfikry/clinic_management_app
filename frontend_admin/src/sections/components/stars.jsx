/* eslint-disable react/prop-types */
import {
  BsStarFill, BsStarHalf, BsStar
} from '../../import'

function Stars({ starsNumber }) {
  const star = (number) => {
    let star = number
    let i = 0
    const li = []
    while (i < 5) {
      if (star >= 1) {
        li.push(<BsStarFill key={i} className="text-teal-color mt-1" />)
      } else if (star > 0) {
        li.push(<BsStarHalf key={i} className="text-teal-color mt-1" />)
      } else {
        li.push(<BsStar key={i} className="text-teal-color mt-1" />)
      }
      star--
      i++
    }
    return li
  }

  return (
    <div className='flex items-center space-x-1'>
      {
        star(starsNumber).map(star => star)
      }
    </div>
  )
}

export default Stars