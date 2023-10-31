import  { useState } from 'react';

function HamburgerButton({displayItems}) {
  const [isOpen, setIsOpen] = useState(false);
  
  const toggleMenu = () => {
    setIsOpen(!isOpen)
    displayItems();
  };

  return (
    <button
      className={`text-black  transition duration-300 ${
        isOpen ? 'transform rotate-0' : 'transform rotate-[-180deg]'
      }`}
      onClick={toggleMenu}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
        />
      </svg>
    </button>
  );
}

export default HamburgerButton;
