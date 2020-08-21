import { createContext } from 'react'
import { noop } from 'lodash'

export const LudensContext = createContext<ILudensContext>({
  theme: {
    mode: 'dark-mode',
    changeMode(_: string) { noop() },
  },
  wallet: {
    shown: true,
    changeShown(_: boolean) { noop() },
  },
})