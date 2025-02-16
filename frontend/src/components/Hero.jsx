import React from 'react';
import { ReactTyped } from 'react-typed';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div className='relative w-full h-screen text-white'>
      <div className='carousel h-full w-full absolute inset-0'>
        <div className='carousel-body h-full opacity-100'>
          <div className='carousel-slide'>
            <div className='bg-[#1b1b1b]/60 flex h-full justify-center items-center p-6'>
              <div className='max-w-[800px] text-center'>
                <p className='text-[#bae51a] font-bold p-2'>Every Word Matters Here</p>
                <h1 className='md:text-7xl sm:text-6xl text-4xl font-bold md:py-6'>Stories Worth Sharing, Always</h1>
                <div className='flex justify-center items-center'>
                  <p className='md:text-5xl sm:text-4xl text-xl font-bold py-4'>Let your voice shine</p>
                  <ReactTyped 
                    className='md:text-5xl sm:text-4xl text-xl font-bold md:pl-4 pl-2'
                    strings={['INSPIRE', 'CONNECT', 'GROW']}
                    typeSpeed={120}
                    backSpeed={140}
                    loop
                  />
                </div>
                <p className='md:text-2xl text-xl font-bold text-gray-300'>Every story matters—let yours be heard by the world. Share your journey, inspire others, and leave a lasting impact.</p>
                <Link to='/signup'>
                  <button className='bg-[#bae51a] w-[200px] rounded-md font-medium my-6 mx-auto py-3 text-black hover:bg-[#d5ff3f]'>
                    Get Started
                  </button>
                </Link>
                <div className='mt-6 grid grid-cols-3 gap-6 text-center'>
                  <div>
                    <h2 className='text-4xl font-bold' id='users-count'>10K+</h2>
                    <p className='text-gray-400'>Active Users</p>
                  </div>
                  <div>
                    <h2 className='text-4xl font-bold' id='stories-count'>50K+</h2>
                    <p className='text-gray-400'>Stories Shared</p>
                  </div>
                  <div>
                    <h2 className='text-4xl font-bold' id='engagement-count'>100K+</h2>
                    <p className='text-gray-400'>Engagements</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
