import { Link } from '@tanstack/react-router';

export const NavBar = () => (
  <div>
    <Link to="/">Home</Link>
    <Link to="/settings">Settings</Link>
    <Link to="/about">About</Link>
  </div>
);
