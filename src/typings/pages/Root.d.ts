declare interface IRootProps {
  accessToken: string
}

declare interface IRootActionProps {
  loader(state: boolean): void
}

declare interface IRootStates {
  themeMode: 'dark-mode' | 'light-mode' | string
}