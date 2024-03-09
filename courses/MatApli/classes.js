/* Helper classes that do not require p5.js*/
window.MathJax = {
  loader: {load: ['[tex]/cases']},
  tex: {packages: {'[+]': ['cases']}}
};

class Point {
    constructor(x,y) {
      this.x = x
      this.y = y
    }
}