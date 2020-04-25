interface IEnvironmentConstants {
  name: string
  api: string
}

interface IStateConstants {
  [name: string]: IEnvironmentConstants
}

declare interface IProjectConstants {
  name: string,
  environment: IStateConstants
}
