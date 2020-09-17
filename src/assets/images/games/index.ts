import Game1 from './tao-pun.png';

declare interface IGames {
  id: number
  image: string
  name: string
}

const gameList: IGames[] = [
  { id: 1, image: Game1, name: 'เต๋าปั่น' },
]

export default gameList