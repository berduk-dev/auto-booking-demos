const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');

const source = fs.readFileSync(__dirname + '/motion.js', 'utf8');

function check(reduced) {
  const visible = { classList: new Set(), getBoundingClientRect: () => ({ top: 100 }) };
  const below = { classList: new Set(), getBoundingClientRect: () => ({ top: 1000 }) };
  let notify;
  const observed = [];
  const context = {
    matchMedia: () => ({ matches: reduced }),
    innerHeight: 800,
    document: { querySelectorAll: () => [visible, below] },
    IntersectionObserver: class {
      constructor(callback) { notify = callback; }
      observe(element) { observed.push(element); }
      unobserve(element) { observed.splice(observed.indexOf(element), 1); }
    }
  };
  context.window = context;
  vm.runInNewContext(source, context);
  if (reduced) {
    assert.equal(observed.length, 0);
    assert.equal(below.classList.size, 0);
  } else {
    assert(visible.classList.has('is-visible'));
    assert(below.classList.has('reveal-ready'));
    assert.deepEqual(observed, [below]);
    notify([{ target: below, isIntersecting: true }]);
    assert(below.classList.has('is-visible'));
    assert.equal(observed.length, 0);
  }
}

check(false);
check(true);
