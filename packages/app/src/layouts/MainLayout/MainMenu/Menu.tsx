/**
 * Main menu items.
 */
import { GAMES } from '@caglarturali/piyango-common';
import HomeIcon from '@material-ui/icons/Home';
import FaceIcon from '@material-ui/icons/Face';
import GameIcon from '../../../components/GameIcon';

export interface MenuCategory {
  title?: string;
  items: MenuItem[];
}

export interface MenuItem {
  id: string;
  text: string;
  path: string;
  icon: React.ReactElement;
}

export const Menu: MenuCategory[] = [
  {
    items: [
      {
        id: '',
        text: 'Ana Sayfa',
        path: '/',
        icon: <HomeIcon />,
      },
    ],
  },
  {
    title: 'Şans Oyunları',
    items: GAMES.map(({ id, name, iconText }) => ({
      id,
      text: name,
      path: `/${id}`,
      icon: <GameIcon content={iconText} />,
    })),
  },
  {
    title: 'Servisler',
    items: [
      {
        id: 'bilen-adam',
        path: 'bilen-adam',
        text: 'Bilen Adam',
        icon: <FaceIcon />,
      },
    ],
  },
];
