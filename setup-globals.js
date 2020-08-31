async function describe(title, callback) {
  console.log(title);
  await callback();
  console.log();
}

async function test(title, callback) {
  try {
    await callback();
    showSuccess(title);
  } catch (error) {
    showSuccess(title); // devia ser o vermelho?
    const { expected, received, message } = JSON.parse(error.message);
    showError(message);
    showError(`Expected: ${expected}`);
    showSuccess(`Received: ${received}`);
  }

  console.log();
}

/*
const handler = {
  apply: function(target, thisArg, argumentsList) {
    console.log(`Calculate sum: ${argumentsList}`);
    // expected output: "Calculate sum: 1,2"
    return target(argumentsList[0], argumentsList[1]) * 10;
  }
};
const proxy1 = new Proxy(sum, handler);
console.log(sum(1, 2));
// expected output: 3
console.log(proxy1(1, 2));
// expected output: 30
*/

const spyOn = (object, key) => {
  object[key] = new Proxy(object[key], {
    apply(target, thisArg, args) {
      console.log('proxying');
      target.count = count ? count + 1 : 0;
      return target.apply(thisArg, args);
    }
  });
}



const foo = spyOn(A, 'foo')

expect(math.sum).toHaveBeenCalled();

// spy
// count: 0
// toHaveBeenCalled() { return count > 0; }

function expect(received) {
  
  const toBeTruthy = function() {    
    if ( !received && this.operator) { 
      throw new Error(
        JSON.stringify({
          message: `${received} is not truthy`,
          expected: 'truthy',
          received,
        })
      );
    }

    if ( !!received && !this.operator) { 
      throw new Error(
        JSON.stringify({
          message: `${received} is truthy`,
          expected: 'truthy',
          received,
        })
      );
    }

  }

  const toBe = function (expected) {
    if (expected !== received && this.operator) {
      throw new Error(
        JSON.stringify({
          message: `${expected} is not equal to ${received}`,
          expected,
          received,
        })
      );
    }

    if (expected === received && !this.operator) {
      throw new Error(
        JSON.stringify({
          message: `${expected} is equal to ${received}`,
          expected: `diff ${expected}`,
          received,
        })
      );
    }
  };

  return {
    toBe: toBe.bind({ operator: true }),
    toBeTruthy: toBeTruthy.bind({ operator: true }),
    toBeFalsy: toBeTruthy.bind({ operator: false }),
    not: {
      toBe: toBe.bind({ operator: false }),
      toBeTruthy: toBeTruthy.bind({ operator: false }),
      toBeFalsy: toBeTruthy.bind({ operator: true }),
    },
  };
}

function showError(str) {
  console.error("\x1b[31m", "  ✗", str);
}

function showSuccess(str) {
  console.log("\x1b[32m", "  ✓", str);
}

global.spyOn = spyOn;
global.test = test;
global.describe = describe;
global.expect = expect;
