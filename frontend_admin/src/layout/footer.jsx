import {
  FaLinkedinIn, FaGithub, FaXTwitter, MdOutlineCopyright
} from '../import'

function Footer() {
  return (
    <footer className="fixed z-50 w-full bottom-0 drop-shadow-md px-2 py-2 justify-center flex items-center border-t bg-gray-color">
      <p className='text-dark-color mr-5 text-xs'>
        <MdOutlineCopyright className='inline-block' /> {new Date().getFullYear()} Amgad Fikry Mohamed, All rights reserved.
      </p>
      <div className='flex items-center space-x-1'>
        <a href="https://github.com/amgadfikry" target="_blank" rel="noopener noreferrer">
          <FaLinkedinIn className='text-teal-color text-base transition-all duration-300 hover:text-dark-color' />
        </a>
        <a href="https://www.linkedin.com/in/amgadfikry/" target="_blank" rel="noopener noreferrer">
          <FaGithub className='text-teal-color text-base transition-all duration-300 hover:text-dark-color' />
        </a>
        <a href="https://twitter.com/amgadfikrymoter" target="_blank" rel="noopener noreferrer">
          <FaXTwitter className='text-teal-color text-base transition-all duration-300 hover:text-dark-color' />
        </a>
      </div>
    </footer>
  )
}

export default Footer