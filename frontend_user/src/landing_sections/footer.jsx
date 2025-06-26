import {
  FaLinkedinIn, FaGithub, FaXTwitter, Link
} from '../import'

function Footer() {
  return (
    <footer className="pt-8 pb-12 px-2 bg-gray-color text-dark-color">
      <nav className="flex space-x-5 items-center justify-center mb-5 text-sm">
        <Link to='/' className="hover:text-teal-color transition-all duration-300 cursor-pointer">Home</Link>
        <Link to='/dashboard/' className="hover:text-teal-color transition-all duration-300 cursor-pointer">Dashboard</Link>
        <Link to='/getstart/' className="hover:text-teal-color transition-all duration-300 cursor-pointer">Sign in</Link>
        <Link className="hover:text-teal-color transition-all duration-300 cursor-pointer">Admin dashboard</Link>
      </nav>
      <nav>
        <div className="flex space-x-5 items-center justify-center mb-5 text-lg">
          <a href="https://github.com/amgadfikry" target="_blank" rel="noopener noreferrer">
            <FaLinkedinIn className='text-teal-color  transition-all duration-300 hover:text-dark-color' />
          </a>
          <a href="https://www.linkedin.com/in/amgadfikry/" target="_blank" rel="noopener noreferrer">
            <FaGithub className='text-teal-color  transition-all duration-300 hover:text-dark-color' />
          </a>
          <a href="https://twitter.com/amgadfikrymoter" target="_blank" rel="noopener noreferrer">
            <FaXTwitter className='text-teal-color  transition-all duration-300 hover:text-dark-color' />
          </a>
        </div>
      </nav>
      <aside className='text-sm text-center'>
        <p>Copyright © {new Date().getFullYear()} Amgad Fikry Mohamed, All rights reserved.</p>
      </aside>
    </footer>
  )
}

export default Footer