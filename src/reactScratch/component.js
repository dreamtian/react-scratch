
import {render} from './render'
class Component {
  constructor (props) {
    this.props = props || {}
    this.state = {}
    this.pendingState = null
    this.parentNode = null
  }
  setState (newState) {
    this.pendingState = Object.assign({}, this.state, newState)
    this.state = this.pendingState
    // console.log(this)
    if (this.parentNode) {
      render(this, this.parentNode)
    }
  }
}
Component.prototype.isReactComponent = true // 类组件的标志
export default Component
