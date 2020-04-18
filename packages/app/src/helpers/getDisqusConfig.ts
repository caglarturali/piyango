import { DateUtils } from '@caglarturali/piyango-utils';
import { DateFormat, DrawDate, Game } from '@caglarturali/piyango-common';
import { DisqusConfig } from '../models/DisqusConfig';
import { Segments } from '../shared';
import { disqus } from '../configs';

/**
 * Returns Disqus config.
 * @param game Game object
 * @param drawDate Draw date
 */
export const getDisqusConfig = (game: Game, drawDate: DrawDate) => {
  const { base_url } = disqus;
  const drawDateUrl = DateUtils.convert(
    drawDate,
    DateFormat.API,
    DateFormat.URL,
  );

  return {
    url: `${base_url}/${game.id}/${Segments.CEKILIS_SONUCLARI}/${drawDateUrl}`,
    identifier: `${game.id}-${drawDateUrl}-comments`,
    title: `${game.name} ${drawDateUrl} Tarihli Çekiliş`,
  } as DisqusConfig;
};
