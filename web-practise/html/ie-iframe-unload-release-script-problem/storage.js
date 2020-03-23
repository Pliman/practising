var top = window.top || window.parent

function globalState() {
  this.state = {}

  // this.top = top
}

globalState.prototype.setState = function (key, value) {
  this.state[key] = value
  // this.top.state = this.state
}

globalState.prototype.getState = function (key)
{
  // return this.top.state[key]
  return this.state[key]
}

// if(!top.state) {
//   top.state = new globalState(top)
// }
var gState = new globalState()

gState.setState('a', 'a1')
console.log(gState.getState('a'))