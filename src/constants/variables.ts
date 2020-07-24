import { values as _values } from 'lodash'
import ImageBankSet from 'assets/images/global/bank'

export const THEME_MODE = {
  DARK: 'dark-mode',
  LIGHT: 'light-mode',
  DARKER: 'darker-mode',
}

export const EBANK: { [key in TBankType]: string } = {
  BBL: 'BBL', // กรุงเทพ
  KBANK: 'KBANK', // กสิกร
  KTB: 'KTB', // กรุงไทย
  TMB: 'TMB', // ทหารไทน
  SCB: 'SCB', // ไทยพาณิชย์
  BAY: 'BAY', // กรุงศรีอยุธยา
  KKP: 'KKP', // เกียรตินาคิน
  CIMBT: 'CIMBT', // ซีไอเอ็มบีไทย
  TISCO: 'TISCO', // ทิสโก้
  TBANK: 'TBANK', // ธนชาต
  UOBT: 'UOBT', // ยูโอบี
  TCD: 'TCD', // ไทยเครดิตเพื่อรายย่อย
  ICBCT: 'ICBCT', // ไอซีบีซี (ไทย)
  GSB: 'GSB', // ออมสิน
  ISBT: 'ISBT', // อิสลามแห่งประเทศไทย
}

export const BANK_NAME: { [key in TBankType]: string } = {
  BBL: 'ธนาคารกรุงเทพ',
  KBANK: 'ธนาคารกสิกร',
  KTB: 'ธนาคารกรุงไทย',
  TMB: 'ธนาคารทหารไทย',
  SCB: 'ธนาคารไทยพาณิชย์',
  BAY: 'ธนาคารกรุงศรีอยุธยา',
  KKP: 'ธนาคารเกียรตินาคิน',
  CIMBT: 'ธนาคารซีไอเอ็มบีไทย',
  TISCO: 'ธนาคารทิสโก้',
  TBANK: 'ธนาคารธนชาต',
  UOBT: 'ธนาคารยูโอบี',
  TCD: 'ธนาคารไทยเครดิตเพื่อรายย่อย',
  ICBCT: 'ธนาคารไอซีบีซี (ไทย)',
  GSB: 'ธนาคารออมสิน',
  ISBT: 'ธนาคารอิสลามแห่งประเทศไทย',
}

export const BANKS: ICBank[] = _values(ImageBankSet).map(item => ({
  value: item.key,
  name: BANK_NAME[item.key],
  Icon: item.Icon,
}))

export const TRANSACTION_TYPE: { [type in TTransactionType]: string } = {
  DEPOSIT: 'ฝากเครดิต',
  WITHDRAW: 'ถอนเครดิต',
}

export const LOTTO_TYPE: { [type in TLottoType]: string } = {
  GOVN: 'หวยรัฐบาล',
  BAAC: 'หวยธกส.',
  GSB: 'หวยออมสิน',
  LAO: 'หวยลาว ( เลขชุด )',
  TH_SHARE_MORNING: 'หุ้นไทยเช้า',
  TH_SHARE_MIDDAY: 'หุ้นไทยเที่ยง',
  TH_SHARE_AFTERNOON: 'หุ้นไทยบ่าย',
  TH_SHARE_EVENING: 'หุ้นไทยเย็น',
  NAT_SHARE_DOWNJON: 'หุ้นดาวน์โจน',
  NAT_SHARE_EGYPT: 'หุ้นอียิปต์',
  NAT_SHARE_GERMANY: 'หุ้นเยอรมัน',
  NAT_SHARE_NIKAII_MORNING: 'หุ้นนิเคอิรอบเช้า',
  NAT_SHARE_NIKAII_AFTERNOON: 'หุ้นนิเคอิรอบบ่าย',
  NAT_SHARE_CHINA_MORNING: 'หุ้นจีนรอบเช้า',
  NAT_SHARE_CHINA_AFTERNOON: 'หุ้นจีนรอบบ่าย',
  NAT_SHARE_TAIWAN: 'หุ้นไต้หวัน',
  NAT_SHARE_KOREA: 'หุ้นเกาหลี',
  NAT_SHARE_SINGAPORE: 'หุ้นสิงค์โปร',
  NAT_SHARE_INDIA: 'หุ้นอินเดีย',
  NAT_SHARE_HANOI_SPECIAL: 'หุ้นฮานอยพิเศษ',
  NAT_SHARE_MALAY: 'หุ้นมาเลย์',
  NAT_SHARE_VIETNAM_HANOI: 'หุ้นเวียดนาม / ฮานอย',
  NAT_SHARE_VIETNAM_HANOI_VIP: 'หุ้นเวียดนาม / ฮานอย VIP',
  NAT_SHARE_HANOI_4D: 'หุ้นฮานอย (4D)',
  NAT_SHARE_RUSSIA: 'หุ้นรัสเซีย',
  NAT_SHARE_ENGLISH: 'หุ้นอังกฤษ',
  NAT_SHARE_HUNGSENG_MORNING: 'หุ้นฮั่งเส็งรอบเช้า',
  NAT_SHARE_HUNGSENG_AFTERNOON: 'หุ้นฮั่งเส็งรอบบ่าย',
  NAT_SHARE_LAO: 'หุ้นลาว',
  YEGEE: 'ยี่กี',
}

export const LOTTO_SLUG_NAME: { [type in TLottoSlug]: string } = {
  LOTTER_YEGEE: 'หวยยี่กี',
  LOTTER_GOVN: 'หวยรัฐบาล',
  LOTTER_BAAC: 'หวยธกส',
  LOTTER_GSB: 'หวยออมสิน',
  LOTTER_LAO_SUITE: 'หวยลาว (เลขชุด)',
  LOTTER_TH_SHARE_MORNING: 'หวยหุ้นไทยเช้า',
  LOTTER_TH_SHARE_MIDDAY: 'หวยหุ้นไทยเที่ยง',
  LOTTER_TH_SHARE_AFTERNOON: 'หวยหุ้นไทยบ่าย',
  LOTTER_TH_SHARE_EVENING: 'หวยหุ้นไทยเย็น',
  LOTTER_NAT_SHARE_DOWNJON: 'หวยหุ้นดาวน์โจน',
  LOTTER_NAT_SHARE_EGYPT: 'หวยหุ้นต่างประเทศอียิปต์',
  LOTTER_NAT_SHARE_GERMANY: 'หวยหุ้นต่างประเทศเยอรมัน',
  LOTTER_NAT_SHARE_NIKAII_MORNING: 'หวยหุ้นนิเคอิรอบเช้า',
  LOTTER_NAT_SHARE_NIKAII_AFTERNOON: 'หวยหุ้นนิเคอิรอบบ่าย',
  LOTTER_NAT_SHARE_CHINA_MORNING: 'หวยหุ้นจีนรอบเช้า',
  LOTTER_NAT_SHARE_CHINA_AFTERNOON: 'หวยหุ้นจีนรอบบ่าย',
  LOTTER_NAT_SHARE_TAIWAN: 'หวยหุ้นไต้หวัน',
  LOTTER_NAT_SHARE_KOREA: 'หวยหุ้นเกาหลี',
  LOTTER_NAT_SHARE_SINGAPORE: 'หวยหุ้นสิงค์โปร',
  LOTTER_NAT_SHARE_INDIA: 'หวยหุ้นอินเดีย',
  LOTTER_NAT_SHARE_HANOI_SPECIAL: 'หวยหุ้นฮานอยพิเศษ',
  LOTTER_NAT_SHARE_MALAY: 'หวยหุ้นมาเลย์',
  LOTTER_NAT_SHARE_VIETNAM_HANOI: 'หวยหุ้นเวียดนาม / ฮานอย',
  LOTTER_NAT_SHARE_VIETNAM_HANOI_VIP: 'หวยหุ้นเวียดนาม / ฮานอย VIP',
  LOTTER_NAT_SHARE_HANOI_4D: 'หวยหุ้นฮานอย (4D)',
  LOTTER_NAT_SHARE_RUSSIA: 'หวยหุ้นรัสเซีย',
  LOTTER_NAT_SHARE_ENGLISH: 'หวยหุ้นอังกฤษ',
  LOTTER_NAT_SHARE_HUNGSENG_MORNING: 'หวยหุ้นฮั่งเส็งรอบเช้า',
  LOTTER_NAT_SHARE_HUNGSENG_AFTERNOON: 'หวยหุ้นฮั่งเส็งรอบบ่าย',
}

export const LOTTO_GAME_TYPE_NAME: { [type in TLottoGameType]: string } = {
  TWO_UP: 'สองตัวบน',
  TWO_DOWN: 'สองตัวล่าง',
  THREE_UP: 'สามตัวบน',
  THREE_FRONT: 'สามตัวหน้า',
  THREE_BACK: 'สามตัวหลัง',
  THREE_TOAST: 'สามตัวโต๊ท',
  FOUR_SUIT: 'เลขชุดสี่ตัว',
  RUN_UP: 'วิ่งบน',
  RUN_DOWN: 'วิ่งล่าง',
  ONE_AWARD: 'รางวัลที่ 1',
  YEGEE_PLAY_AWARD: 'รางวัลยิงเลขลำดับที่',
}

export const LOTTO_GAME_TYPES: { [type in TLottoSlug]: TLottoGameType[] } = {
  LOTTER_YEGEE: ['THREE_UP', 'THREE_TOAST', 'TWO_UP', 'TWO_DOWN', 'RUN_UP', 'RUN_DOWN'],
  LOTTER_GOVN: [],
  LOTTER_BAAC: [],
  LOTTER_GSB: [],
  LOTTER_LAO_SUITE: [],
  LOTTER_TH_SHARE_MORNING: [],
  LOTTER_TH_SHARE_MIDDAY: [],
  LOTTER_TH_SHARE_AFTERNOON: [],
  LOTTER_TH_SHARE_EVENING: [],
  LOTTER_NAT_SHARE_DOWNJON: [],
  LOTTER_NAT_SHARE_EGYPT: [],
  LOTTER_NAT_SHARE_GERMANY: [],
  LOTTER_NAT_SHARE_NIKAII_MORNING: [],
  LOTTER_NAT_SHARE_NIKAII_AFTERNOON: [],
  LOTTER_NAT_SHARE_CHINA_MORNING: [],
  LOTTER_NAT_SHARE_CHINA_AFTERNOON: [],
  LOTTER_NAT_SHARE_TAIWAN: [],
  LOTTER_NAT_SHARE_KOREA: [],
  LOTTER_NAT_SHARE_SINGAPORE: [],
  LOTTER_NAT_SHARE_INDIA: [],
  LOTTER_NAT_SHARE_HANOI_SPECIAL: [],
  LOTTER_NAT_SHARE_MALAY: [],
  LOTTER_NAT_SHARE_VIETNAM_HANOI: [],
  LOTTER_NAT_SHARE_VIETNAM_HANOI_VIP: [],
  LOTTER_NAT_SHARE_HANOI_4D: [],
  LOTTER_NAT_SHARE_RUSSIA: [],
  LOTTER_NAT_SHARE_ENGLISH: [],
  LOTTER_NAT_SHARE_HUNGSENG_MORNING: [],
  LOTTER_NAT_SHARE_HUNGSENG_AFTERNOON: [],
}

export const LOTTO_GAME_TYPE_LENGTH: { [type in TLottoGameType]: number } = {
  TWO_UP: 2,
  TWO_DOWN: 2,
  THREE_UP: 3,
  THREE_FRONT: 3,
  THREE_BACK: 3,
  THREE_TOAST: 3,
  FOUR_SUIT: 4,
  RUN_UP: 1,
  RUN_DOWN: 1,
  ONE_AWARD: 6,
  YEGEE_PLAY_AWARD: 5,
}