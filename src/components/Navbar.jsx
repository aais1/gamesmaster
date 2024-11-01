import React, { useContext, useEffect, useState } from 'react';
import logouticon from '../assets/logout-icon.png';
import hamburger from '../assets/hamburger.png';
import { useUserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate=useNavigate();

  const {setUser} = useUserContext();

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  const handleLogout=()=>{
    localStorage.removeItem('user');
    setUser(null);
    navigate('/login');
  }

  // Effect to hide menu on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (menuOpen) {
        setMenuOpen(false); // Close the menu when scrolling
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [menuOpen]);

  return (
    <div>
      <nav className="border-b border-white bg-black sticky top-0">
        <div className="flex px-4 md:p-2 justify-between items-center p-2 w-[97vw] mx-auto">
          <div className='md:hidden block text-white cursor-pointer' onClick={toggleMenu}>
            <img src={hamburger} height={40} width={40} alt="Menu" />
          </div>
          <div className="flex items-center space-x-4">
            <img src="/logo.png" alt="Games master" className="h-16 w-16" />
            <span className="text-3xl md:block hidden font-bold text-white">GAMES MASTER</span>
          </div>
          <div className='block md:hidden'>
            <div onClick={handleLogout} className='flex flex-row space-x-3'>
              <img className='cursor-pointer' src={logouticon} height={20} width={20} alt="Logout" />
            </div>
          </div>
          <div className="hidden space-x-6 text-gray-300 md:flex">
            <a href="#" className="hover:text-white">Create your own Maps</a>
            <a href="#" className="hover:text-white">Support</a>
            <a href="#" className="hover:text-white">Work with us</a>
            <div onClick={handleLogout} className='flex flex-row space-x-3'>
              <a href="#" className="hover:text-white">Logout</a>
              <img src={logouticon} height={20} width={20} alt="Logout" />
            </div>
          </div>
        </div>
      </nav>

      {/* Hamburger Menu */}
      {menuOpen && (
        <div className='flex flex-col z-30 min-h-[calc(100vh-80px)] absolute w-[75%] space-y-4 text-xl text-white pl-4 pt-8 bg-black border-r justify-between pb-12'>
          <div className='flex flex-col space-y-4'>
            <a href="#" className="hover:text-white hover:underline">Create your own Maps</a>
            <a href="#" className="hover:text-white hover:underline">Support</a>
            <a href="#" className="hover:text-white hover:underline">Work with us</a>
          </div>
          <div onClick={handleLogout} className='flex flex-row space-x-3'>
              <a href="#" className="hover:text-white">Logout</a>
              <img src={logouticon} height={20} width={20} alt="Logout" />
            </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
