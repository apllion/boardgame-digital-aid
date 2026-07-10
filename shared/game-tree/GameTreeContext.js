import { createContext, useContext } from 'react'

export const GameTreeContext = createContext(null)

export function useGameContext() {
  return useContext(GameTreeContext)
}
