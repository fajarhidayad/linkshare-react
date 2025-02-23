import { PlatformLink, useLink } from '@/context/link-context';
import clsx from 'clsx';
import {
  BatteryMediumIcon,
  ChevronDownIcon,
  FacebookIcon,
  GithubIcon,
  GlobeIcon,
  LinkedinIcon,
  TwitterIcon,
  YoutubeIcon,
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import InputContainer from './input-container';

const platforms: PlatformLink[] = [
  {
    id: 1,
    value: 'youtube',
    label: 'YouTube',
    color: '#ee3939',
    icon: YoutubeIcon,
  },
  {
    id: 2,
    value: 'github',
    label: 'GitHub',
    color: '#1A1A1A',
    icon: GithubIcon,
  },
  {
    id: 3,
    value: 'linkedin',
    label: 'LinkedIn',
    color: '#2d68ff',
    icon: LinkedinIcon,
  },
  {
    id: 4,
    value: 'medium',
    label: 'Medium',
    color: '#252525',
    icon: BatteryMediumIcon,
  },
  {
    id: 5,
    value: 'facebook',
    label: 'Facebook',
    color: '#2442AC',
    icon: FacebookIcon,
  },
  {
    id: 6,
    value: 'twitter',
    label: 'X / Twitter',
    color: '#000',
    icon: TwitterIcon,
  },
  {
    id: 7,
    value: 'website',
    label: 'Website',
    color: '#633CFF',
    icon: GlobeIcon,
  },
];

export default function Dropdown(props: {
  id: number;
  activePlatform: PlatformLink | null;
}) {
  const [menu, setMenu] = useState(false);

  const { updateLink } = useLink();

  const ref = useRef<HTMLDivElement | null>(null);

  function toggleDropdown() {
    setMenu((prev) => !prev);
  }

  function onClickPlatform(platform: PlatformLink) {
    updateLink(props.id, platform);
    console.log(props.id, platform);
    toggleDropdown();
  }

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setMenu(false);
      }
    };

    document.addEventListener('click', handler);

    return () => {
      document.removeEventListener('click', handler);
    };
  }, [ref]);

  return (
    <InputContainer ref={ref} className="relative flex items-center bg-white">
      <button onClick={toggleDropdown} className="w-full flex items-center">
        {props.activePlatform?.label ? (
          <>
            <props.activePlatform.icon className="mr-3" />
            {<span>{props.activePlatform.label}</span>}
          </>
        ) : (
          <p>Choose Platform</p>
        )}
        <ChevronDownIcon
          className={clsx('transition duration-200 ml-auto text-primary', {
            'rotate-0': !menu,
            '-rotate-180': menu,
          })}
        />
      </button>
      <ul
        className={clsx(
          'absolute z-20 left-0 top-14 bg-white rounded-lg border border-gray-300 w-full px-4 dropdown transition-all duration-150 ease-in-out',
          {
            'dropdown-open': menu,
            'opacity-0 translate-y-[-10%]': !menu,
          }
        )}
      >
        {platforms.map((platform) => (
          <LinkItem key={platform.id} onClick={() => onClickPlatform(platform)}>
            <platform.icon size={20} />
            <p>{platform.label}</p>
          </LinkItem>
        ))}
      </ul>
    </InputContainer>
  );
}

function LinkItem(props: { children: React.ReactNode; onClick?: () => void }) {
  return (
    <li
      onClick={props.onClick}
      className="flex items-center space-x-3 not-last:border-b not-last:border-b-gray-200 py-3 text-gray-500 hover:text-primary hover:cursor-pointer"
    >
      {props.children}
    </li>
  );
}
