/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import {
  MdNavigateNext, MdNavigateBefore, useEffect, useRef, useState, SectionHeader
} from '../import'

function Offers({ offersData }) {
  const [scrollMove, setScrollMove] = useState(0)
  const [scrollEnd, setScrollEnd] = useState(false)

  const scrollDiv = useRef(null)

  const handleNextBtn = () => {
    const move = scrollDiv.current.offsetWidth
    setScrollMove(scrollMove + move)
    scrollDiv.current.scrollLeft += move
  }

  const handlePrevBtn = () => {
    const move = scrollDiv.current.offsetWidth
    setScrollMove(scrollMove - move)
    scrollDiv.current.scrollLeft -= move
  }
  useEffect(() => {
    Math.floor(scrollDiv.current.scrollWidth - scrollMove) <= scrollDiv.current.offsetWidth
      ? setScrollEnd(true)
      : setScrollEnd(false)
  }, [scrollMove])

  return (
    <section className="relative overflow-hidden" id='offers'>
      <div className='w-[20px] h-[50px] absolute left-0 top-10 bg-yellow-color opacity-30'></div>
      <div className='w-[20px] h-[50px] absolute left-0 bottom-[120px] bg-teal-color opacity-30'></div>
      <div className='py-16 px-2 container mx-auto'>
        <SectionHeader span='Our' title='Offers'
          paragraph='Choose from diffrent offers and enjoy dicount' />
        <div className="flex flex-row items-center space-x-5">
          <button disabled={scrollMove <= 0}
            className={`transition-all duration-300  cursor-pointer border rounded-lg 
          ${scrollMove <= 0
                ? 'text-gray-400 border-gray-400 hover:text-gray-400  hover:bg-transparent'
                : 'text-teal-color border-teal-color hover:text-white hover:bg-teal-color'}`}>
            <MdNavigateBefore className='text-4xl' onClick={handlePrevBtn} />
          </button>
          <div className="flex-1 flex flex-row items-center flex-nowrap overflow-x-scroll space-x-5 md:space-x-8 no-scrollbar scroll-smooth div-s" ref={scrollDiv}>
            {offersData.map(offer => {
              return (
                <article key={offer.id}
                  className='flex flex-col flex-1 min-w-[200px] md:min-w-[250px] lg:min-w-[300px] rounded-lg pb-2 overflow-hidden'>
                  <div className='relative rounded-lg overflow-hidden mb-3'>
                    <img src={offer.image} alt={offer.title} className='max-w-full h-[200px] block' />
                    <p className='absolute top-3 left-2 bg-teal-color px-3 drop-shadow-lg text-white rotate-[-2deg]'>
                      {parseInt(offer.percentage)}%</p>
                  </div>
                  <h4 className='text-dark-color text-lg font-medium px-1'>{offer.title}</h4>
                  <p className='px-1 mb-1'>
                    <span className='text-gray-300 line-through mr-3'>{offer.old_price}$</span>
                    <span className='text-teal-color'>{offer.new_price}$</span>
                  </p>
                  <p className='text-dark-color px-1 leading-5 text-sm text-light'>{offer.description}</p>

                </article>
              )
            })}
          </div>
          <button disabled={scrollEnd}
            className={`transition-all duration-300  cursor-pointer border rounded-lg 
          ${scrollEnd
                ? 'text-gray-400 border-gray-400 hover:text-gray-400  hover:bg-transparent'
                : 'text-teal-color border-teal-color hover:text-white hover:bg-teal-color'}`}>
            <MdNavigateNext className="text-4xl" onClick={handleNextBtn} />
          </button>
        </div>
      </div>
    </section>
  )
}

export default Offers