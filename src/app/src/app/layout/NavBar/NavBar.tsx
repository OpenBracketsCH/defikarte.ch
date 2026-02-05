import { Link } from '@tanstack/react-router';

export const NavBar = () => {
  const activeClassName = 'text-primary-100-green-02';

  return (
    <div className="flex justify-center px-4 py-2 bg-primary-100-green-04 text-primary-100-white">
      <div className="flex gap-3">
        <Link to="/" activeProps={{ className: activeClassName }}>
          Home
        </Link>
        <Link to="/settings" activeProps={{ className: activeClassName }}>
          Settings
        </Link>
        <Link to="/about" activeProps={{ className: activeClassName }}>
          About
        </Link>
      </div>
    </div>
  );
};
