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
import InputBox from './input-box';

const platforms = [
  {
    id: 1,
    platform: 'YouTube',
    icon: YoutubeIcon,
  },
  {
    id: 2,
    platform: 'GitHub',
    icon: GithubIcon,
  },
  {
    id: 3,
    platform: 'LinkedIn',
    icon: LinkedinIcon,
  },
  {
    id: 4,
    platform: 'Medium',
    icon: BatteryMediumIcon,
  },
  {
    id: 5,
    platform: 'Facebook',
    icon: FacebookIcon,
  },
  {
    id: 6,
    platform: 'Twitter / X',
    icon: TwitterIcon,
  },
  {
    id: 7,
    platform: 'Website',
    icon: GlobeIcon,
  },
];

export default function DropdownInputPlatform(props: {
  onChange: (value: string) => void;
  value: string;
}) {
  const [menu, setMenu] = useState(false);

  // const { updateLink } = useLink();

  const ref = useRef<HTMLDivElement | null>(null);

  function toggleDropdown() {
    setMenu((prev) => !prev);
  }

  function onClickPlatform(value: string) {
    // updateLink(props.id, platform);
    props.onChange(value);
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
    <InputBox ref={ref} className="relative flex items-center bg-white">
      <button
        onClick={toggleDropdown}
        type="button"
        className="w-full flex items-center"
      >
        {props.value ? (
          <>
            {/* <props.activePlatform.icon className="mr-3" /> */}
            {<span>{props.value}</span>}
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
        {platforms.map((link) => (
          <LinkItem
            key={link.id}
            onClick={() => onClickPlatform(link.platform)}
          >
            <link.icon size={20} />
            <p>{link.platform}</p>
          </LinkItem>
        ))}
      </ul>
    </InputBox>
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
