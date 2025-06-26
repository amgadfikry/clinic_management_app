/* eslint-disable no-unused-vars */
import {
  SectionHeader, FaLinkedinIn, FaGithub, FaXTwitter
} from '../import'

function About() {
  return (
    <section className="relative overflow-hidden" id='about'>
      <div className='w-[20px] h-[50px] absolute right-0 top-10 bg-teal-color opacity-30'></div>
      <div className='w-[20px] h-[50px] absolute right-0 bottom-[100px] bg-yellow-color opacity-30'></div>
      <div className='py-16 container mx-auto px-2'>
        <SectionHeader span='About' title='Developer'
          paragraph='Crafting Digital Excellence: Meet the Full-Stack Developer Behind the Code' />
        <div className="flex flex-col">
          <p className='text-center text-dark-color text-sm lg:w-[70%] lg:mx-auto'>
            As a full-stack developer with a penchant for backend development,
            I excel in crafting web applications using my
            proficiency in Python and JavaScript. My focus is on creating, refining, and optimizing projects, showcasing
            a portfolio of meticulously developed applications. Explore the innovative solutions that highlight my dedication
            to building exceptional software.</p>
          {/*<div className='flex items-center justify-center space-x-8 text-3xl  mt-10'>
            <a href="https://github.com/amgadfikry" target="_blank" rel="noopener noreferrer">
              <FaLinkedinIn className='text-teal-color  transition-all duration-300 hover:text-dark-color' />
            </a>
            <a href="https://www.linkedin.com/in/amgadfikry/" target="_blank" rel="noopener noreferrer">
              <FaGithub className='text-teal-color  transition-all duration-300 hover:text-dark-color' />
            </a>
            <a href="https://twitter.com/amgadfikrymoter" target="_blank" rel="noopener noreferrer">
              <FaXTwitter className='text-teal-color  transition-all duration-300 hover:text-dark-color' />
            </a>
          </div>*/}
        </div>
      </div>
    </section>
  )
}

export default About