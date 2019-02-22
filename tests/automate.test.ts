import { State, NFA, buildToNFA } from '../src/lib/automata';

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

    test('should build string to NFA as expect', () => {
      const NFA1 = buildToNFA('ab|')
      expect(NFA1.startState.epsilonTransition[0].transition.a.epsilonTransition[0])
        .toEqual(new State(true))
      expect(NFA1.startState.epsilonTransition[1].transition.b.epsilonTransition[0])
        .toEqual(new State(true))

      const NFA2 = buildToNFA('ab·')
      expect(NFA2.startState.transition.a.epsilonTransition[0].transition.b)
        .toEqual(new State(true))

      const NFA3 = buildToNFA('a*')
      expect(NFA3.startState.epsilonTransition[1]).toEqual(new State(true))
      expect(NFA3.startState.epsilonTransition[0].transition.a.epsilonTransition[0])
        .toEqual(new State(true))
      expect(NFA3.startState.epsilonTransition[0].transition.a.epsilonTransition[1].transition.a.epsilonTransition[0])
        .toEqual(new State(true))
    })
  })
})
