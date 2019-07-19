export interface PokemonApi {
  id: string;
  name: string;
  types: [TypeApi];
  moves: [RedirectInfoMoveApi];
  stats: [RedirectInfoStatApi];
  sprites: SpritesApi;
}

export interface RedirectInfoMoveApi {
  move: {
    name: string;
    url: string;
  }
}

export interface RedirectInfoStatApi {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
    url: string;
  }
}

export interface TypeApi {
  slot: number;
  type: {
    name: string;
    url: string;
  }
}

export interface SpritesApi {
  back_default: string;
  front_default: string;
}

export interface MoveApi {
  accuracy: number;
  id: number;
  names: NameApi[];
  power: number;
  pp: number;
  flavor_text_entries: FlavorTextApi[],
  damage_class: {
    name: string;
  }
}

export interface StatApi {
  names: NameApi[]
}

export interface NameApi {
  name: string;
  language: {
    name: string;
  }
}

export interface FlavorTextApi {
  flavor_text: string;
  language: {
    name: string;
  }
}

export interface GetPokemonByNameArgument {
  name: string;
}

export interface Pokemon {
  img: string;
  name: string;
  types: string[];
  moves: string[];
  stats: Stat[];
}

export interface Move {
  id: number;
  name: string;
  description: string;
  accuracy: number;
  damageClass: string;
  power: number;
  pp: number;
}

export interface Stat {
  name: string;
  base: number;
}