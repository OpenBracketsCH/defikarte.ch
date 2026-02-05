import { Link, type LinkProps } from '@tanstack/react-router';

interface IconLinkProps extends LinkProps {
  iconSrc: string;
  text: string;
}

export const IconLink = ({ to, text, iconSrc: icon, ...props }: IconLinkProps) => {
  return (
    <Link to={to} {...props}>
      <img src={icon} alt={text} />
      <span>{text}</span>
    </Link>
  );
};
