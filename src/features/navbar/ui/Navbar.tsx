import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <div>
      <ul>
        <NavLink to="/">
          <li>Home</li>
        </NavLink>
        <NavLink to="psychologists">
          <li>Psychologists</li>
        </NavLink>
        <NavLink to="favorites">
          <li>Favorites</li>
        </NavLink>
      </ul>
      <button>Log in</button>
      <button>Registration</button>
    </div>
  );
};

export default Navbar;
