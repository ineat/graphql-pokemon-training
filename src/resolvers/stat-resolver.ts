import { Stat } from '../models';
import { GlobalContext } from '../apollo-context';

export function getLocalizedStatName(stat: Stat, _:any, { dataSources }: GlobalContext) {
  return dataSources.pokemonRestDataSource.getLocalizedStatName(stat);
}