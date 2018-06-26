import {update} from './update'
class Component {
  constructor (props) {
    this.props = props || {}
    this.state = {}

    this.pendingState = null // 合并的state 也就是next的state
    this.currentElement = null // 当前的vDom 在update也就是prevElement
    this.parentNode = null // 父节点
  }
  shouldComponentUpdate () {
    return true
  }
  updateComponent () {
    const prevState = this.state
    const prevElement = this.currentElement
    if (this.pendingState !== prevState) { // !!!
      this.state = this.pendingState // 此处把pendingState赋值给当前state 下面this.render()函数里的state就是新的state了
    }
    this.pendingState = null // 重置pendingState
    const nextElement = this.render()
    this.currentElement = nextElement
    update(prevElement, nextElement, this.parentNode)
  }
  setState (newState) {
    this.pendingState = Object.assign({}, this.state, newState)
    this.updateComponent()
  }

  render () {}
}
export default Component
