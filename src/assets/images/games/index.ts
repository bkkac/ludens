import Game1 from './joker-gaming-blackbeard-legacy.png';
import Game2 from './joker-gaming-caishen-riches.png';
import Game3 from './joker-gaming-chilli-hunter.png';
import Game4 from './joker-gaming-cluster-mania.png';
import Game5 from './joker-gaming-horus-eye.png';
import Game6 from './joker-gaming-joker-madness.png';
import Game7 from './joker-gaming-lions-dance.png';
import Game8 from './joker-gaming-mythical-sand-1.png';
import Game9 from './joker-gaming-tai-shang-lao-jun.png';
import Game10 from './joker-gaming-tangkas.png';
import Game11 from './joker-gaming-the-four-invention.png';
import Game12 from './joker-gaming-wild-giant-panda.png';

declare interface IGames {
  id: number
  image: string
  name: string
}

const gameList: IGames[] = [
  { id: 1, image: Game1, name: 'Blackbeard Legacy' },
  { id: 2, image: Game2, name: 'Caishen Riches' },
  { id: 3, image: Game3, name: 'Chilli Hunter' },
  { id: 4, image: Game4, name: 'Cluster Mania' },
  { id: 5, image: Game5, name: 'Horus Eye' },
  { id: 6, image: Game6, name: 'Joker Madness' },
  { id: 7, image: Game7, name: 'Lions Dance' },
  { id: 8, image: Game8, name: 'Mythical Sand' },
  { id: 9, image: Game9, name: 'Taishang Laojun' },
  { id: 10, image: Game10, name: 'Tangkas' },
  { id: 11, image: Game11, name: 'Four Invention' },
  { id: 12, image: Game12, name: 'Wild Giant Panda' },
]

export default gameList