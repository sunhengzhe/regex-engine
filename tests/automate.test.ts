import { State, NFA } from '../src/lib/automata'

describe('#automata', () => {
  describe('state', () => {
    test('should initialize as expect', () => {
      const startState = new State(false)
      expect(startState.isEnd).toEqual(false)
      expect(startState.transition).toEqual({})
      expect(startState.epsilonTransition).toEqual([])

      const endState = new State(true)
      expect(endState.isEnd).toEqual(true)
      expect(endState.transition).toEqual({})
      expect(endState.epsilonTransition).toEqual([])
    })

    test('should support invocation chaining', () => {

    })
  })
})
