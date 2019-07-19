import { IResolvers } from 'graphql-tools';

import { GlobalContext } from '../../apollo-context';
import { Pokemon, GetPokemonByNameArgument, Move, Stat } from '@src/models';

import * as filePokemon from '../../data/pokemon.json';
import * as fileMove from '../../data/moves.json';
const fakePokemons: Pokemon[] = [...filePokemon];
const fakeMoves: Move[] = [...fileMove];

export const fakeResolvers: IResolvers<any, GlobalContext> = {
  Query: {
    getPokemonByName(_: any, args: GetPokemonByNameArgument) {
      return Promise.resolve(fakePokemons.find(p => p.name === args.name));
    }
  },
  Pokemon: {
    moves(parent: Pokemon) {
      const foundMoves = parent.moves.map(
        move => fakeMoves.find(fakeMove => fakeMove.name === move)
      );
      return Promise.resolve(foundMoves);
    }
  },
  Stat: {
    name(parent: Stat) {
      return Promise.resolve(parent.name);
    }
  }
};