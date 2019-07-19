import { PokemonRestDataSource } from './datasources/PokemonRestDataSource';

export interface GlobalContext {
  dataSources: {
    ['pokemonRestDataSource']: PokemonRestDataSource,
  };
  language: string;
}