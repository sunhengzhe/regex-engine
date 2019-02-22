import { insertExplicitConcatOperator, infixToPostfix } from "./lib/infix-to-postfix";
import { State, NFA, buildToNFA } from "./lib/automata";

const q0 = new State();
const q1 = new State();
const q2 = new State();
const q3 = new State();
const q4 = new State();
const q5 = new State();
const q6 = new State();
const q7 = new State();
const q8 = new State(true);
q0.addEpsilonTransition(q7);
q0.addEpsilonTransition(q1);
q1.addEpsilonTransition(q2);
q1.addEpsilonTransition(q4);
q2.addTransition("a", q3);
q3.addEpsilonTransition(q6);
q4.addTransition("b", q5);
q5.addEpsilonTransition(q6);
q6.addEpsilonTransition(q1);
q6.addEpsilonTransition(q7);
q7.addTransition("c", q8);

export const match = (regex: string, exp: string): boolean => {
  const strWithConcat = insertExplicitConcatOperator(exp)
  const strWithPostfix = infixToPostfix(strWithConcat)
  const nfa = buildToNFA(strWithPostfix)

  return false
}