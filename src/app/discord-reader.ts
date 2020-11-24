export interface Name {
  en: string;
}

export interface Stats {
  form: "normal" | "alola" | undefined;
  atk: number;
  maxAtk: number;
  def: number;
  maxDef: number;
  sta: number;
  maxSta: number;
  level: number | undefined;
  maxLevel: number | undefined;
}

export class Pokemon {
  names: Name;
  national_id: number;
  stats: Stats[];
}

export function mapPokemons(data: string, pokemons: Pokemon[]) {}
