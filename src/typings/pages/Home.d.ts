declare interface IHomeProps {
  getLottoIsFetching: boolean
  getLottoError: string
  getLottoCode: number | string
  lottoList: ILotto[]
}

declare interface IHomeActionProps {
  getLottoList(): void
}

declare interface ILoginFormProps {

}

declare interface ILottoListProps {
  data: ReadonlyArray<ILotto>
}
