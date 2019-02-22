import { insertExplicitConcatOperator, infixToPostfix } from "./lib/infix-to-postfix";
import { buildToNFA, isMatchOf } from './lib/automata';

export const match = (regex: string, exp: string): boolean => {
  const strWithConcat = insertExplicitConcatOperator(regex)
  const strWithPostfix = infixToPostfix(strWithConcat)
  const nfa = buildToNFA(strWithPostfix)

  return isMatchOf(exp, nfa)
}