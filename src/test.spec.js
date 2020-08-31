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

describe('to be truthy', () => {
  test('should be true', () => {
    expect(true).toBeTruthy();
    expect([]).toBeTruthy();
    expect({}).toBeTruthy();
    expect('string').toBeTruthy();
    expect(123).toBeTruthy();
  })

  test('should not be true', () => {
    expect('').not.toBeTruthy();
    expect(false).not.toBeTruthy();
    expect(null).not.toBeTruthy();
    expect(undefined).not.toBeTruthy();
    expect(0).not.toBeTruthy();
  })
})

describe('to be falsy', () => {
  test('should be false', () => {
    expect('').toBeFalsy();
    expect(false).toBeFalsy();
    expect(null).toBeFalsy();
    expect(undefined).toBeFalsy();
    expect(0).toBeFalsy();
  })
  
  test('should not be false', () => {
    expect(true).not.toBeFalsy();
    expect([]).not.toBeFalsy();
    expect({}).not.toBeFalsy();
    expect('string').not.toBeFalsy();
    expect(123).not.toBeFalsy();
  })
})

describe('spy on', () => {
  test('should sum 2 + 3 and result to 5', () => {
    const object = {
      sum: (num1, num2) => {
        return num1 + num2
      }
    }

    spyOn(object, 'sum');
    // spyOn2(object, 'funcao');

    const result = object.sum(2, 3);

    expect(result).toBe(5)
  })
})