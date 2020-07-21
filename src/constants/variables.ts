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
  LAO_SUITE: 'หวยลาว ( เลขชุด )',
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

export const LOTTO_GAME_TYPE: { [type in TLottoGameType]: string } = {
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