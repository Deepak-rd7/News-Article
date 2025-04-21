import React from 'react'
import { Link } from 'react-router-dom';
export default function Home() {
  return (
    <div className="relative min-h-screen">
  
    <img
      src="https://images.unsplash.com/photo-1583932334951-9a74f88ea6aa?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bmV3cyUyMHdlYnNpdGV8ZW58MHx8MHx8fDA%3D"
      alt="News Background"
      className="absolute inset-0 w-full h-full object-cover z-0"
    />

    
    <div className="absolute inset-0 bg-black bg-opacity-60 z-10" />

    
    <div className="relative z-20 flex flex-col items-center justify-center text-center text-white min-h-screen px-4">
      <h1 className="text-5xl md:text-6xl font-bold mb-4">Welcome to The News App</h1>
      <p className="text-lg md:text-xl max-w-xl mb-8">
        Stay informed with the latest headlines, articles, and live news from around the world.
      </p>

      <div className="space-x-4 flex">
        <li className='transition duration-300 hover:scale-105  list-none'>
        <Link
          to="/signup"
          className="bg-transparent  text-white font-semibold py-2 px-6 rounded-md  transition-transform duration-300  hover:scale-105"
        >
          Login 
        </Link>
        </li>

          <>/</>

          <li className='list-none transition duration-300  hover:scale-105 '>
          <Link
          to="/signup"
          className="bg-transparent  text-white font-semibold py-2  rounded-md  transition duration-300"
        >
          Sign Up 
        </Link>
          </li>

      </div>
    </div>
  </div>
);
};

 
