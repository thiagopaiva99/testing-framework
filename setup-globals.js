async function describe(title, callback) {
  console.log(title);
  await callback();
  console.log();
}

async function test(title, callback) {
    try {    
      await callback()
      showSuccess(title);
    } catch(error) {
        showSuccess(title);
        const { expected, received, message } = JSON.parse(error.message);
        showError(message);
        showError(`Expected: ${expected}`);
        showSuccess(`Received: ${received}`);
    }

    console.log()
}

  
function expect(received) {
  const toBe = function (expected) {
      if (expected !== received  && this.operator) {
          throw new Error(JSON.stringify({ message: `${expected} is not equal to ${received}`, expected, received }));
      }

      if (expected === received  && !this.operator) {
        throw new Error(JSON.stringify({ message: `${expected} is equal to ${received}`, expected: `diff ${expected}`, received }));
    }
  }  

  return {
    toBe: toBe.bind({ operator: true }),
    not: {
        toBe: toBe.bind({ operator: false })
    }
  }
}
  
function showError(str) {
 console.error('\x1b[31m','  ✗', str);
}
  
function showSuccess(str) {
 console.log('\x1b[32m','  ✓', str);
}
  
global.test = test;
global.describe = describe;
global.expect = expect;