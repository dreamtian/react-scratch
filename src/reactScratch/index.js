import Component from './component'
// import {mount} from './mount'
import {createElement} from './creact'
import {render} from './render'
const ReactScratch = {
  Component,
  createElement
}
const ReactScratchDOM = {
  render: (vnode, parentNode) => {
    parentNode.innerHTML = ''
    return render(vnode, parentNode)
  }
}
export {
  ReactScratchDOM
}
export default ReactScratch
