import { Link } from '@tanstack/react-router';
import LogoImg from '../assets/devlinks-logo.png';

export default function Logo() {
  return (
    <Link to="/" className="flex items-center space-x-2.5">
      <img src={LogoImg} alt="logo" />
      <h2 className="heading-m font-bold text-gray-700 hidden md:block">
        devlinks
      </h2>
    </Link>
  );
}
