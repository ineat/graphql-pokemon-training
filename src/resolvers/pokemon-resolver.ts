import { GetPokemonByNameArgument } from '../models';
import { GlobalContext } from '../apollo-context';

export function getPokemonByName(_: any, args: GetPokemonByNameArgument, { dataSources }: GlobalContext) {
  return dataSources.pokemonRestDataSource.getPokemonByName({ name: args.name });
}