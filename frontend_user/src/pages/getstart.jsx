import {
  Routes, Route, Signin, Signup, FaLinkedinIn, FaGithub, FaXTwitter, Link
} from '../import'

function GetStart() {
  return (
    <section className='w-screen h-screen flex flex-col items-center'>
      <Routes>
        <Route exact path='/' element={<Signin />} ></Route>
        <Route exact path='signup' element={<Signup />} ></Route>
      </Routes>
      <footer className="py-2 px-2 mt-auto bg-gray-color text-dark-color  w-full">
        <nav className="flex space-x-5 items-center justify-center mb-2 text-sm">
          <Link to='/' className="hover:text-teal-color transition-all duration-300 cursor-pointer">Home</Link>
          <Link to='/getstart/signup' className="hover:text-teal-color transition-all duration-300 cursor-pointer">Sign UP</Link>
          <Link to='/getstart/' className="hover:text-teal-color transition-all duration-300 cursor-pointer">Sign In</Link>
        </nav>
        <nav>
          <div className="flex space-x-5 items-center justify-center  text-sm">
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
        <aside className='text-sm text-center mt-2'>
          <p>Copyright © {new Date().getFullYear()} Amgad Fikry Mohamed, All rights reserved.</p>
        </aside>
      </footer>
    </section>
  );
}

export default GetStart;
