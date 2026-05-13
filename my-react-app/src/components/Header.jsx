import { cn } from '../utils';

function Header({ toggleSidebar }) {
  return (
    <header
      className={cn(
        'flex items-center justify-between px-5 py-4',
        'bg-primary text-white w-full fixed top-0 left-0'
      )}
    >
      <div className='flex items-center gap-4'>
        <button
          className=' bg-none border-none text-[#09defb] text-xl cursor-pointer '
          onClick={toggleSidebar}
        >
          <i>Toggle</i>
        </button>
        <span>LOGO</span>
      </div>
      <span>Profile</span>
    </header>
  );
}

export default Header;
