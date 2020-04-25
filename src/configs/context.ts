import { createContext } from 'react'
import { noop } from 'lodash'
import { THEME_MODE } from 'constants/variables'

export const ThemeContext = createContext({
  mode: THEME_MODE.DARK,
  changeMode(_: string) { noop() },
})