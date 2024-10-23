import Rand from 'rand-seed';

const seed = () => useState('random.seed', () => Date.now());

export function useRandom(): Rand {
  const app = useNuxtApp();
  if (!app._globalRand) {
    app._globalRand = new Rand(String(seed().value));
  }
  return app._globalRand as Rand;
}
