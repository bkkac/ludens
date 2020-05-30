interface IEnvironmentConstants {
  name: string
  api: string
  socket: string
}

interface IStateConstants {
  [name: string]: IEnvironmentConstants
}

declare interface IProjectConstants {
  name: string
  environmentName: string
  environment: IStateConstants
}
