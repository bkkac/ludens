import ThailandIcon from './thailand.svg'
import LaoIcon from './laos.svg'
import UnitedStateIcon from './usa.svg'
import EgyptIcon from './egypt.svg'
import GermanyIcon from './germany.svg'
import JapanIcon from './japan.svg'
import ChinaIcon from './china.svg'
import KoreaIcon from './south-korea.svg'
import SingaporeIcon from './singapore.svg'
import IndiaIcon from './india.svg'
import VietnamIcon from './vietnam.svg'
import MalaysiaIcon from './malaysia.svg'
import RussianIcon from './russia.svg'
import EnglandIcon from './uk.svg'
import TaiwanIcon from './taiwan.svg'
import HongKongIcon from './hong-kong.svg'
import BankIcon from '../bank'

const flagImage: IImageFlag = {
  THA: {
    name: 'Thailand',
    Icon: ThailandIcon,
  },
  LAO: {
    name: 'Lao',
    Icon: LaoIcon,
  },
  USA: {
    name: 'United State',
    Icon: UnitedStateIcon,
  },
  EGY: {
    name: 'Egypt',
    Icon: EgyptIcon,
  },
  DEU: {
    name: 'Germany',
    Icon: GermanyIcon,
  },
  JPN: {
    name: 'Japan',
    Icon: JapanIcon,
  },
  CHN: {
    name: 'China',
    Icon: ChinaIcon,
  },
  TWN: {
    name: 'Taiwan',
    Icon: TaiwanIcon,
  },
  KOR: {
    name: 'Korea',
    Icon: KoreaIcon,
  },
  SGP: {
    name: 'Singapore',
    Icon: SingaporeIcon,
  },
  IND: {
    name: 'India',
    Icon: IndiaIcon,
  },
  VNM: {
    name: 'Viet Nam',
    Icon: VietnamIcon,
  },
  MYS: {
    name: 'Malaysia',
    Icon: MalaysiaIcon,
  },
  RUS: {
    name: 'Russian',
    Icon: RussianIcon,
  },
  GBR: {
    name: 'United Kingdom',
    Icon: EnglandIcon,
  },
  HKG: {
    name: 'Hong Kong',
    Icon: HongKongIcon,
  },
  // Bank
  BAAC: {
    name: BankIcon.BAAC.name,
    Icon: BankIcon.BAAC.Icon,
  },
  GSB: {
    name: BankIcon.GSB.name,
    Icon: BankIcon.GSB.Icon,
  },
}

export default flagImage