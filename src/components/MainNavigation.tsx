import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useAutoAnimate } from '@formkit/auto-animate/react';

import Menu from './Menu.tsx';
import classes from './MainNavigation.module.css';

function App() {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [transition] = useAutoAnimate();

  function isElementClicked(bool: boolean) {
    if (bool) setShowMobileMenu(false);
  }

  return (
    <header className={`${classes['nav-bg']} fixed w-full z-10`}>
      <nav className="shadow-lg">
        <div className="max-w-7xl mx-auto flex items-center justify-between h-16 px-4">
          <div>
            <NavLink to="/" onClick={() => window.scrollTo({top: 0, left: 0, behavior: 'smooth'})}>
              <img
                src="./home-34.svg"
                alt="home"
                className={`${classes['filter-white']}`}
              />
            </NavLink>
          </div>
          <div className="hidden tablet:block">
            <Menu onClickedElement={isElementClicked} />
          </div>
          <button
            type="button"
            aria-label="menu"
            className="tablet:hidden bg-gray-900 p-2 rounded-md text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:bg-gray-700 focus:text-white transition duration-150 ease-in-out"
            onClick={() => setShowMobileMenu(!showMobileMenu)}
          >
            <svg
              className="h-6 w-6"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </button>
        </div>
        <div className="tablet:hidden" ref={transition}>
          {showMobileMenu && <Menu onClickedElement={isElementClicked} />}
        </div>
      </nav>
    </header>
  );
}

export default App;
