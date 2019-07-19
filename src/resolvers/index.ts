import { IResolvers } from 'graphql-tools';

import { GlobalContext } from '../apollo-context';
import { getPokemonByName } from './pokemon-resolver';
import { getMovesByNames } from './move-resolver';
import { getLocalizedStatName } from './stat-resolver';

export const resolvers: IResolvers<any, GlobalContext> = {
  Query: {
    getPokemonByName
  },
  Pokemon: {
    moves: getMovesByNames
  },
  Stat: {
    name: getLocalizedStatName
  }
};