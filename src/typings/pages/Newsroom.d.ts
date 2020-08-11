declare interface INewsroomProps {
  news: ReadonlyArray<INews>
  getNewsIsFetching: boolean
  getNewsCode: number | string
  getNewsError: string
}

declare interface INewsroomActionProps {
  loader(state: boolean): void
  getNews(): void
}