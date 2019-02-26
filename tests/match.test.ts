import { match } from '../src/index'

describe('#match', () => {
  test('should concat works as expect', () => {
    expect(match('a', 'a')).toBe(true)
    expect(match('a', 'b')).toBe(false)
    expect(match('ab', 'ab')).toBe(true)
    expect(match('ab', 'a')).toBe(false)
  })

  test('should closure works as expect', () => {
    expect(match('a*', 'a')).toBe(true)
    expect(match('a*', 'aaa')).toBe(true)
    expect(match('a*', 'b')).toBe(false)
    expect(match('a*b', 'b')).toBe(true)
    expect(match('a*b', 'aaaab')).toBe(true)
    expect(match('a(abc)*c', 'ac')).toBe(true)
    expect(match('a(abc)*c', 'aabcc')).toBe(true)
    expect(match('a(abc)*c', 'aabcabcabcc')).toBe(true)
    expect(match('a(abc)*c', 'addc')).toBe(false)
  })

  test('should union works as expect', () => {
    expect(match('a|b', 'a')).toBe(true)
    expect(match('a|b', 'b')).toBe(true)
    expect(match('a|b', 'c')).toBe(false)
    expect(match('a|b', 'ab')).toBe(false)
    expect(match('jack|rose', 'jack')).toBe(true)
    expect(match('jack|rose', 'rose')).toBe(true)
    expect(match('jack|rose', 'jac')).toBe(false)
  })

  test('should zero-to-one works as expect', () => {
    expect(match('a?', 'a')).toBe(true)
    expect(match('a?', '')).toBe(true)
    expect(match('a?', 'b')).toBe(false)
    expect(match('ab?c', 'ac')).toBe(true)
    expect(match('ab?c', 'abc')).toBe(true)
    expect(match('a(abc)?c', 'ac')).toBe(true)
    expect(match('a(abc)?c', 'aabcc')).toBe(true)
    expect(match('a(abc)?c', 'aabcabcc')).toBe(false)
    expect(match('a(abc)?c', 'addc')).toBe(false)
  })

  test('should one-to-more works as expect', () => {
    expect(match('a+', 'a')).toBe(true)
    expect(match('a+', '')).toBe(false)
    expect(match('a+', 'b')).toBe(false)
    expect(match('ab+c', 'ac')).toBe(false)
    expect(match('ab+c', 'abc')).toBe(true)
    expect(match('ab+c', 'abbbc')).toBe(true)
    expect(match('a(abc)+c', 'ac')).toBe(false)
    expect(match('a(abc)+c', 'aabcc')).toBe(true)
    expect(match('a(abc)+c', 'aabcabcc')).toBe(true)
    expect(match('a(abc)+c', 'addc')).toBe(false)
  })

  test('should complicated exp works as expect', () => {
    expect(match('(jack|rose)*', 'jackjackrose')).toBe(true)
    expect(match('a(bc)*', 'ab')).toBe(false)
    expect(match('a(bc)*', 'abc')).toBe(true)
    expect(match('a(b|c)*', 'a')).toBe(true)
    expect(match('a(b|c)*', 'abbccb')).toBe(true)
  })
})