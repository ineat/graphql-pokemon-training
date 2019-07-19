import { Pokemon } from '../models';
import { GlobalContext } from '../apollo-context';

export function getMovesByNames(pokemon: Pokemon, _: any, { dataSources }: GlobalContext) {
  return dataSources.pokemonRestDataSource.getMovesByNames(pokemon.moves);
}