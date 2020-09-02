import Casino1 from './casino_1.jpg';
import Casino2 from './casino_2.jpg';
import Casino3 from './casino_3.jpg';
import Casino4 from './casino_4.jpg';
import Casino5 from './casino_5.jpg';
import Casino6 from './casino_6.jpg';

declare interface ICasino {
  id: number
  image: string
}

const casinoList: ICasino[] = [
  { id: 1, image: Casino1 },
  { id: 2, image: Casino2 },
  { id: 3, image: Casino3 },
  { id: 4, image: Casino4 },
  { id: 5, image: Casino5 },
  { id: 6, image: Casino6 },
]

export default casinoList