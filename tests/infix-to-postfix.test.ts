import { insertExplicitConcatOperator, infixToPostfix } from '../src/lib/infix-to-postfix'

describe('#infix-to-postfix', () => {
  describe('insertExplicitConcatOperator', () => {
    test('should insert dots between word', () => {
      expect(insertExplicitConcatOperator('a')).toBe('a')
      expect(insertExplicitConcatOperator('ab')).toBe('a·b')
      expect(insertExplicitConcatOperator('abc')).toBe('a·b·c')
    })

    test('should insert dots between * and word', () => {
      expect(insertExplicitConcatOperator('a*b')).toBe('a*·b')
      expect(insertExplicitConcatOperator('a*bc')).toBe('a*·b·c')
      expect(insertExplicitConcatOperator('ab*c')).toBe('a·b*·c')
    })

    test('should insert dots between ? and word', () => {
      expect(insertExplicitConcatOperator('a?b')).toBe('a?·b')
      expect(insertExplicitConcatOperator('a?bc')).toBe('a?·b·c')
      expect(insertExplicitConcatOperator('ab?c')).toBe('a·b?·c')
    })

    test('should insert dots between * and (', () => {
      expect(insertExplicitConcatOperator('a*(b*(c))')).toBe('a*·(b*·(c))')
    })

    test('should insert dots between ? and (', () => {
      expect(insertExplicitConcatOperator('a?(b*(c))')).toBe('a?·(b*·(c))')
    })

    test('should insert dots between ) and word', () => {
      expect(insertExplicitConcatOperator('(ce)df')).toBe('(c·e)·d·f')
    })
  })

  describe('infixToPostfix', () => {
    test('should transfer infix to postfix', () => {
      expect(infixToPostfix('a')).toBe('a')
      expect(infixToPostfix('a·b')).toBe('ab·')
      expect(infixToPostfix('a·b·c')).toBe('ab·c·')

      expect(infixToPostfix('a*·b')).toBe('a*b·')
      expect(infixToPostfix('a*·b·c')).toBe('a*b·c·')
      expect(infixToPostfix('a·b*·c')).toBe('ab*·c·')

      expect(infixToPostfix('a?·b')).toBe('a?b·')
      expect(infixToPostfix('a?·b·c')).toBe('a?b·c·')
      expect(infixToPostfix('a·b?·c')).toBe('ab?·c·')

      expect(infixToPostfix('a*·(b?·(c))')).toBe('a*b?c··')
    })
  })
})
