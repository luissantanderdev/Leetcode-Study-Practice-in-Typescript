// Rules for Recursion
// 1. Identify the base case
// 2. Identify the recursive case
// 3. Get closer and closer and return when needed.

// MARK: Simple Recursive Counter
let counter: number = 0;
function inception() {
  if (counter > 3) {
    return 'done!';
  }
  counter++;
  inception();
}

// MARK: Tail Recursion
// NOTE: Tail Recursion: A call is tail-recursive if nothing has to be done after the call returns i.e. when the call returns,
//       the returned value is immediately returned from the calling function

// MARK: Head Recursion
// NOTE: Head Recursion: A call is head-recursive when the first statement of the function is the recursive call.
