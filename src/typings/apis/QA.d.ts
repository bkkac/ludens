declare type TQAType = | 'privacy' | 'yeege' | 'affiliate'

declare interface IQAContent {
  id: number,
  type: TQAType,
  title: string
  content: string
}