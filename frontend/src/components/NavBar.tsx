import logo from "../assets/logo.svg";
const NavBar = () => {
  return (
    <div className="w-full py-4 px-6 flex shadow-md bg-white ">
      <img src={logo} alt="logo" className="w-9 mr-3.5" />
      <span>
        <h1 className="text-xl font-bold text-blue-600">HD</h1>
      </span>
    </div>
  );
};

export default NavBar;
