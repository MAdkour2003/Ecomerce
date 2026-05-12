function Header({ toggleSidebar }) {
  return (
    // Gh
    <header className=" h-10  bg-[#035fcf] text-white flex justify-between p-[15px_30px_20px_30px] fixed top-0 left-0 right-0 ml-2">
      <div className="header-left">
        <button
          className=" bg-none border-none m-[0px_4px_0px_0px] text-[#09defb] text-xl cursor-pointer "
          onClick={toggleSidebar}
        >
          <i className="fas fa-bars">(",")</i>
        </button>
        <span className="header-title">My Website</span>
      </div>
      <div className="header-right">
        <span>Profile</span>
      </div>
    </header>
  );
}

export default Header;
