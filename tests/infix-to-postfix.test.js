const { insertExplicitConcatOperator, infixToPostfix } = require('../lib/infix-to-postfix')

describe('#infix-to-postfix', () => {
  describe('insertExplicitConcatOperator', () => {
    test('should insert dots at the point of concatenation', () => {
      expect(
        insertExplicitConcatOperator('ab')
      ).toBe('a·b')
      expect(
        insertExplicitConcatOperator('a*b')
      ).toBe('a*·b')
      expect(
        insertExplicitConcatOperator('(a|b)*c')
      ).toBe('(a|b)*·c')
      expect(
        insertExplicitConcatOperator('(a|b)*(cd)e')
      ).toBe('(a|b)*·(c·d)·e')
    })
  })

  describe('infixToPostfix', () => {
    test('should transfer infix to postfix', () => {
      expect(
        infixToPostfix('(a|b)*·c')
      ).toBe('ab|*c·')
      expect(
        infixToPostfix('a·b·c')
      ).toBe('ab·c·')
    })
  })
})
