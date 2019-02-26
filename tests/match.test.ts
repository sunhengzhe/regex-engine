import { match } from '../src/index'

describe('#match', () => {
  test('should works as expect', () => {
    expect(match('a', 'a')).toBe(true)
    expect(match('a', 'b')).toBe(false)
    expect(match('a*', 'a')).toBe(true)
    expect(match('a*', 'aaa')).toBe(true)
    expect(match('a*', 'b')).toBe(false)
    expect(match('a|b', 'a')).toBe(true)
    expect(match('a|b', 'b')).toBe(true)
    expect(match('a|b', 'c')).toBe(false)
    expect(match('a|b', 'ab')).toBe(false)
    expect(match('jack|rose', 'jack')).toBe(true)
    expect(match('jack|rose', 'rose')).toBe(true)
    expect(match('jack|rose', 'jac')).toBe(false)
    expect(match('(jack|rose)*', 'jackjackrose')).toBe(true)
    expect(match('ab', 'ab')).toBe(true)
    expect(match('ab', 'a')).toBe(false)

    expect(match('a*b', 'b')).toBe(true)
    expect(match('a*b', 'aaaab')).toBe(true)
    expect(match('a(bc)*', 'ab')).toBe(false)
    expect(match('a(bc)*', 'abc')).toBe(true)
    expect(match('a(b|c)*', 'a')).toBe(true)
    expect(match('a(b|c)*', 'abbccb')).toBe(true)
  })
})