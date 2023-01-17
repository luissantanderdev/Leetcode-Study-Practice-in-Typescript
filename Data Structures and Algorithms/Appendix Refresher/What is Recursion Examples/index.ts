// Rules for Recursion
// 1. Identify the base case
// 2. Identify the recursive case
// 3. Get closer and closer and return when needed.

// Recursion Benefits and Draw Backs
// 1. DRY Readability
// 2. But adds a large stack which adds space complexity.
// 3. Very helpful for things where you don't know how deep something is like in trees.wh


/**
 *  Everytime you are using a tree or converting something into a tree, consider recursion. 
 *  1. Divide into a number of subproblems that are smaller instances of the same problem. 
 *  2. Each instance of the subproblem is identical in nature. 
 *  3. The solutions of each subproblem can be combined to solve the problem at hand. 
 * 
 */



// MARK: Tail Recursion
// NOTE: Tail Recursion: A call is tail-recursive if nothing has to be done after the call returns i.e. when the call returns, the returned value is immediately returned from the calling function
function tail(n: number) {
  if (n === 1) return;
  else console.log(n);

  tail(n - 1);
}

// MARK: Head Recursion
// NOTE: Head Recursion: A call is head-recursive when the first statement of the function is the recursive call.
function head(n: number) {
  if (n === 0) return;
  else head(n - 1);

  console.log(n);
}

// MARK: Simple Recursive Counter
let counter: number = 0;
function inception() {
  if (counter > 3) {
    return 'done!';
  }
  counter++;
  inception();
}
