import { RESTDataSource } from 'apollo-datasource-rest';
import { ApolloError } from 'apollo-server';

import { GlobalContext } from '../apollo-context';
import { PokemonApi, GetPokemonByNameArgument, Pokemon, Move, MoveApi, NameApi, FlavorTextApi, StatApi, Stat } from '../models';

export class PokemonRestDataSource extends RESTDataSource<GlobalContext> {
  constructor() {
    super();
    this.baseURL = 'https://pokeapi.co/api/v2/';
  }

  getPokemonByName(args: GetPokemonByNameArgument) {
    return this.get<PokemonApi>(`pokemon/${args.name}`)
      .then(pokemon => {
        if (pokemon.types.find(typeApi => typeApi.type.name === 'bug')) {
          throw new ApolloError('OMG there is a bug !', '500');
        }
        return this.pokemonReducer(pokemon);
      });
  }

  getMovesByNames(names: string[]) {
    return Promise.all(names.map(name => this.get<MoveApi>(`move/${name}`)))
      .then(results => results.map(this.moveReducer));
  }

  getLocalizedStatName(stat: Stat) {
    return this.get<StatApi>(`stat/${stat.name}`).then(this.statReducer);
  }

  pokemonReducer = (response: PokemonApi): Pokemon => (
    {
      img: response.sprites.front_default,
      name: response.name,
      types: response.types.map(typeApi => typeApi.type.name),
      moves: response.moves.map(moveDetail => moveDetail.move.name),
      stats: response.stats.map(statDetail => ({ name: statDetail.stat.name, base: statDetail.base_stat }))
    }
  );

  moveReducer = (response: MoveApi): Move => (
    {
      id: response.id,
      name: this.moveNameReducer(response.names),
      accuracy: response.accuracy,
      damageClass: response.damage_class.name,
      power: response.power,
      pp: response.pp,
      description: this.moveDescriptionReducer(response.flavor_text_entries)
    }
  );

  moveDescriptionReducer = (textEntries: FlavorTextApi[]): string => {
    const flavor = textEntries.find(entry => entry.language.name === this.context.language);
    return flavor ? flavor.flavor_text : 'Description not found';
  }

  moveNameReducer = (names: NameApi[]): string => {
    const description = names.find(moveName => moveName.language.name === this.context.language);
    return description ? description.name : 'Move not found';
  }

  statReducer = (response: StatApi): string => {
    const statName = response.names.find(entry => entry.language.name === this.context.language);
    return statName ? statName.name : 'Stat not found';
  }
}

