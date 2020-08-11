const { sumAsync, subtractAsync } = require('./math');

describe('Calculator', () => {
  test('should sum 5 + 2', async () => {
      const result = await sumAsync(5, 2)
      const expected = 7;
      expect(result).toBe(expected)  
  })

  test('is not should not sum 5 + 2', async () => {
    const result = await sumAsync(5, 2)
    const expected = 7;
    expect(result).not.toBe(expected)  
  })

  test('should subtract 5 - 2', async () => {
      const result = await subtractAsync(5, 2)
      const expected = 3;
      expect(result).toBe(expected)  
  })
})