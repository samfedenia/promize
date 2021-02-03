const syncCallbacker = (funcA, funcB, ...args) => {
  if (!(typeof funcA === "function" && typeof funcB === "function")) {
    throw new Error("both arguments must be functions");
  }
  if (funcA === "undefined" || funcB === "undefined") {
    throw new Error("needs at least two arguments");
  }
  // two functions only
  //return funcB(funcA());

  // arbitrary number of function args
  const funcs = [funcB, ...args];
  return funcs.reduce((acc, func) => func(acc), funcA());
};

const asyncCallbacker = (funcA, funcB, ...args) => {
  if (!(typeof funcA === "function" && typeof funcB === "function")) {
    throw new Error("both arguments must be functions");
  }
  if (funcA === "undefined" || funcB === "undefined") {
    throw new Error("needs at least two arguments");
  }

  // two functions only
  // function callB(v) {
  //   return funcB(v, function () {
  //     return "done";
  //   });
  // }
  // return funcA(0, callB);

  // arbitrary number of function args
  const funcs = [funcB, ...args];
  const done = () => "done";
  const reducer = (acc, func) => (v) => func(v, acc);
  const funcChain = funcs.reduce(reducer, done);
  return funcA("anything", funcChain);
};
module.exports = { syncCallbacker, asyncCallbacker };
