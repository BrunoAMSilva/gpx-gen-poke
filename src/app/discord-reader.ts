export interface Name {
  en: string;
}

export interface Stats {
  form: "normal" | "alola" | "none";
  atk: number;
  maxAtk: number;
  def: number;
  maxDef: number;
  sta: number;
  maxSta: number;
  level: number;
  maxLevel: number;
}

export class Pokemon {
  names: Name;
  national_id: number;
  stats: Stats[];
}

export function mapPokemons(data: string, pokemons: Pokemon[]) {
  let lines = data.split("\n");

  lines.forEach(ln => {
    if (ln.startsWith("**")) {
      const name = ln.slice(2).split("**")[0];
      const pokemon = pokemons.find(pk => pk.names.en === name);
      if (pokemon) {
        const statsData = ln.split(":");
      }
    }
  });
}
