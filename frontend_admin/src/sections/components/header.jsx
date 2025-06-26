/* eslint-disable react/prop-types */
import { headerPhoto } from '../../import'

function Header({ head }) {
  return (
    <header className="relative w-full mb-[100px]">
      <div className='  flex justify-center items-center'>
        <img className='block max-h-[200px] sm:max-h-[250px] lg:max-h-[300px] w-full object-cover rounded-b-xl overflow-hidden' src={headerPhoto}
          alt='Image by wwwfreepikcom' />
      </div>
      <h3 className="absolute top-5 left-3 text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold">{head}</h3>
    </header>
  )
}

export default Header