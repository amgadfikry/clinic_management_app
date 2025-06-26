import {
  FaLinkedinIn, FaGithub, FaXTwitter, Link
} from '../import'

function FooterDashboard() {
  return (
    <footer className="py-3 px-2 bg-gray-color text-dark-color mt-auto">
      <nav className="flex space-x-5 items-center justify-center mb-2 text-sm">
        <Link to='/dashboard/' className="hover:text-teal-color transition-all duration-300 cursor-pointer">Dashboard</Link>
        <Link to='/dashboard/appointments' className="hover:text-teal-color transition-all duration-300 cursor-pointer">Appointments</Link>
        <Link to='/dashboard/feedback' className="hover:text-teal-color transition-all duration-300 cursor-pointer">Feedback</Link>
        <Link to='/dashboard/profile' className="hover:text-teal-color transition-all duration-300 cursor-pointer">Profile</Link>
      </nav>
      <nav>
        <div className="flex space-x-5 items-center justify-center mb-2 text-lg">
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

export default FooterDashboard