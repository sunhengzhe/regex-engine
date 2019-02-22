import { CONCATENATION_OPERATOR, UNION_OPERATOR, CLOSURE_OPERATOR,
  GROUP_LEFT_OPERATOR, GROUP_RIGHT_OPERATOR } from './token'

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
  static createBasicNFA(token: string|undefined) {
    const startState = new State()
    const endState = new State(true)
    if (token) {
      startState.addTransition(token, endState)
    } else {
      startState.addEpsilonTransition(endState)
    }

    return new NFA(startState, endState)
  }

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

export const buildToNFA = (exp: string) => {
  const stack: Array<NFA> = []

  for (const token of exp) {
    if (token === UNION_OPERATOR) {
      const bNFA = stack.pop()
      const aNFA = stack.pop()
      stack.push(NFA.union(aNFA, bNFA))
    } else if (token === CONCATENATION_OPERATOR) {
      const bNFA = stack.pop()
      const aNFA = stack.pop()
      stack.push(NFA.concat(aNFA, bNFA))
    } else if (token === CLOSURE_OPERATOR) {
      const nfa = stack.pop()
      stack.push(NFA.closure(nfa))
    } else {
      stack.push(NFA.createBasicNFA(token))
    }
  }

  return stack.pop()
}