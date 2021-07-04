function* idMaker() {
  var i = 0;
  const postUserIds = [
    [21, 22],
    [1, 2, 3, 11, 12, 13],
    [21, 22, 55, 56, 3, 4]
  ];

  while (true)
    yield postUserIds[i++ % 3];
}

const postReqIds = idMaker();

export const getNextPostIds = () => {
  return postReqIds.next().value as number[];
}


function fibonacci(n: number): number {
  if (n === 0 || n === 1) {
    return n;
  }
  return fibonacci(n - 1) + fibonacci(n - 2);
}

export const calculateExpensive = (username: string) => {
  const calculate = username.length < 20 ? username.length + 25 : 40;

  console.log(`Star expensive: ${username}`);
  const start = Date.now();

  const fib = fibonacci(calculate);
  const duration = Date.now() - start;

  console.log(`End Expensive ${username} Duration: ${duration}`);


  return duration;
}

/**
 * Delay for a specific number of milliseconds
 * @param time Time to delay in milliseconds
 * @return a Promise which resolves after a timeout set by using the given time
 */
export async function delay(time: number): Promise<{}> {
  return await new Promise(resolve => setTimeout(resolve, time));
}

/**
 * Sync wait
 * @param seconds 
 */
export function wait(seconds: number) {
  var start = Date.now();
  while ((Date.now() - start) / 1000 < seconds);
}

export function slowFunction(username: string) {
  wait(1);
  return username.length;
}
