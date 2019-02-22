export class State {
  isEnd: boolean;
  transition: {[key: string]: State};
  epsilonTransition: State[];

  constructor(isEnd: boolean = false) {
    this.isEnd = isEnd;
    this.transition = {};
    this.epsilonTransition = [];
  }

  addTransition(token: string, to: State): State {
    this.transition[token] = to;
    return this;
  }

  addEpsilonTransition(to: State): State {
    this.epsilonTransition.push(to);
    return this;
  }
}

export class NFA {
  static union(aNFA: NFA, bNFA: NFA): NFA {
    const newStartState = new State();
    const newEndState = new State(true);

    newStartState.addEpsilonTransition(aNFA.startState)
      .addEpsilonTransition(bNFA.startState);
    aNFA.endState.addEpsilonTransition(newEndState);
    bNFA.endState.addEpsilonTransition(newEndState);

    return new NFA(newStartState, newEndState);
  }

  static concat(aNFA: NFA, bNFA: NFA): NFA {
    const newStartState = aNFA.startState;
    const newEndState = bNFA.endState;

    aNFA.endState.addEpsilonTransition(bNFA.startState);

    return new NFA(newStartState, newEndState);
  }

  static closure(nfa: NFA) {
    const newStartState = new State()
    const newEndState = new State(true)

    newStartState.addEpsilonTransition(nfa.startState)
      .addEpsilonTransition(newEndState)
    nfa.endState.addEpsilonTransition(newEndState)
      .addEpsilonTransition(nfa.startState)

      return new NFA(newStartState, newEndState)
  }

  startState: State;
  endState: State;

  constructor(startState: State, endState: State) {
    this.startState = startState;
    this.endState = endState;
  }
}
