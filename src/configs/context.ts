import { createContext } from 'react'
import { noop } from 'lodash'
import { THEME_MODE } from 'constants/variables'

export const LudensContext = createContext({
  theme: {
    mode: THEME_MODE.DARKER,
    changeMode(_: string) { noop() },
  },
  wallet: {
    shown: true,
    changeShown(_: boolean) { noop() },
  },
})