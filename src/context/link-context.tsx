import { CircleHelpIcon, LucideProps } from 'lucide-react';
import { createContext, ReactNode, useContext, useState } from 'react';

export interface PlatformLink {
  id: number;
  value: string;
  label: string;
  color: string;
  icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, 'ref'> & React.RefAttributes<SVGSVGElement>
  >;
}

export interface LinkContext {
  links: PlatformLink[];
  addLink: () => void;
  updateLink: (id: number, link: PlatformLink) => void;
  removeLink: (id: number) => void;
}

const LinkContext = createContext<LinkContext | null>(null);

export function LinkProvider(props: { children: ReactNode }) {
  const [links, setLinks] = useState<PlatformLink[]>([]);

  function addLink() {
    if (links.find((link) => link.id === 0) || links.length > 4) return;
    setLinks((prev) => [
      ...prev,
      {
        id: 0,
        color: '#EFEFEF',
        icon: CircleHelpIcon,
        label: '',
        value: '',
      },
    ]);
    return;
  }

  function updateLink(id: number, link: PlatformLink) {
    if (!links.find((item) => item.id === id)) return;
    setLinks((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          return {
            ...link,
            id: id === 0 ? links.length + 1 : id,
          };
        }
        return item;
      })
    );
  }

  function removeLink(id: number) {
    setLinks((prev) => prev.filter((link) => link.id !== id));
  }

  return (
    <LinkContext.Provider value={{ links, addLink, removeLink, updateLink }}>
      {props.children}
    </LinkContext.Provider>
  );
}

export function useLink() {
  const context = useContext(LinkContext);
  if (!context) {
    throw new Error('useLink must be used within an AuthProvider');
  }
  return context;
}
