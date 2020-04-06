import {
  DateFormat,
  DateUtils,
  DrawDataType,
  Game,
} from '@caglarturali/piyango-common';
import { Segments } from '../../shared';
import { disqus } from '../../config';

export interface DisqusConfig {
  url: string;
  identifier: string;
  title: string;
}

/**
 * Returns Disqus config.
 * @param game Game object
 * @param drawData Draw Data
 */
export const getDisqusConfig = (game: Game, drawData: DrawDataType) => {
  const { base_url } = disqus;

  const urlDate = DateUtils.convert(
    drawData.cekilisTarihi,
    DateFormat.FRIENDLY,
    DateFormat.URL,
  );

  return (
    {
      url: `${base_url}/${game.id}/${Segments.CEKILIS_SONUCLARI}/${urlDate}`,
      identifier: `${game.id}-${urlDate}-comments`,
      title: `${game.name} ${urlDate} Tarihli Çekiliş`,
    } as DisqusConfig
  );
};
