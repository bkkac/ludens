type BANK_TYPE =
  | 'BBL' // กรุงเทพ
  | 'KBANK' // กสิกร
  | 'KTB' // กรุงไทย
  | 'TMB' // ทหารไทน
  | 'SCB' // ไทยพาณิชย์
  | 'BAY' // กรุงศรีอยุธยา
  | 'KKP' // เกียรตินาคิน
  | 'CIMBT' // ซีไอเอ็มบีไทย
  | 'TISCO' // ทิสโก้
  | 'TBANK' // ธนชาต
  | 'UOBT' // ยูโอบี
  | 'TCD' // ไทยเครดิตเพื่อรายย่อย
  | 'ICBCT' // ไอซีบีซี (ไทย)
  | 'GSB' // ออมสิน
  | 'ISBT' // อิสลามแห่งประเทศไทย
  | ''

declare interface IBank {
  id?: number
  type?: BANK_TYPE
  name?: string
  number?: string
  createdAt?: string
  updatedAt?: string
}
