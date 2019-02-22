interface ITransitionMap {
  [key: string]: State
}

export class State {
  isEnd: boolean
  transition: ITransitionMap
  epsilonTransition: Array<State>

  constructor (isEnd: boolean) {
    this.isEnd = isEnd
    this.transition = {}
    this.epsilonTransition = []
  }

  addTransition (token: string, to: State) {
    this.transition[token] = to
    return this
  }

  addEpsilonTransition (to: State) {
    this.epsilonTransition.push(to)
    return this
  }
}

export class NFA {
  static union (aNFA: NFA, bNFA: NFA) {
    const newStartState = new State(false)
    const newEndState = new State(true)

    newStartState.addEpsilonTransition(aNFA.startState)
      .addEpsilonTransition(bNFA.startState)
    aNFA.endState.addEpsilonTransition(newEndState)
    bNFA.endState.addEpsilonTransition(newEndState)

    return new NFA(newStartState, newEndState)
  }

  static concat (aNFA: NFA, bNFA: NFA) {
    const newStartState = aNFA.startState
    const newEndState = bNFA.endState

    aNFA.endState.addEpsilonTransition(bNFA.startState)
    return new NFA(newStartState, newEndState)
  }

  startState: State
  endState: State

  constructor (startState: State, endState: State) {
    this.startState = startState
    this.endState = endState
  }
}
