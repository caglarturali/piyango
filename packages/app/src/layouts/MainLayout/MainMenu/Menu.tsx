/**
 * Main menu items.
 */
import { GAMES } from '@caglarturali/piyango-common';
import { GameIcon } from '@caglarturali/piyango-components';
import HomeIcon from '@material-ui/icons/Home';
import FaceIcon from '@material-ui/icons/Face';

export interface MenuCategory {
  title?: string;
  items: MenuItem[];
}

export interface MenuItem {
  id: string;
  text: string;
  icon: React.ReactElement;
  active: boolean;
}

export const Menu: MenuCategory[] = [
  {
    items: [
      {
        id: '',
        text: 'Ana Sayfa',
        icon: <HomeIcon />,
        active: true,
      },
    ],
  },
  {
    title: 'Şans Oyunları',
    items: GAMES.map(({ id, name, iconText }) => ({
      id,
      text: name,
      icon: <GameIcon content={iconText} />,
      active: false,
    })),
  },
  {
    title: 'Servisler',
    items: [
      {
        id: 'bilen-adam',
        text: 'Bilen Adam',
        icon: <FaceIcon />,
        active: false,
      },
    ],
  },
];
