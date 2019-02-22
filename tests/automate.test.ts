import { State, NFA } from '../src/lib/automata'

describe('#automata', () => {
  describe('state', () => {
    test('should initialize as expect', () => {
      const startState = new State()
      expect(startState.isEnd).toEqual(false)
      expect(startState.transition).toEqual({})
      expect(startState.epsilonTransition).toEqual([])

      const endState = new State(true)
      expect(endState.isEnd).toEqual(true)
      expect(endState.transition).toEqual({})
      expect(endState.epsilonTransition).toEqual([])
    })

    test('should support invocation chaining', () => {
      const stateA = new State()
      const stateB = new State()
      const stateC = new State()
      const stateD = new State()
      stateA.addTransition('a', stateB)
        .addEpsilonTransition(stateC)
        .addTransition('b', stateD)

      const { transition, epsilonTransition } = stateA
      expect(transition).toEqual({
        a: stateB,
        b: stateD
      })
      expect(epsilonTransition).toEqual([stateC])
    })
  })
})
