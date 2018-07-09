// 为了便于理解我们先不用jsx的方式去写vdom 其实道理都是一样的 jsx只不过是方便我们书写组件
// 至于jsx到底编译成了什么 可以见.babellrc文件中的plugin
// 其实react中所有的一切都是从reactDom.render开始的 对应本例中的mount方法
// 至于为什么react所有文件中头部都要显示引入React 其实就是因为babel编译时要用到React.createElement这个方法
// React.createElement对应本例中的ReactScratch.createElement
// 本例中的Vdom是模拟reactfiber架构之前的 16版本fiber架构让react内部有很多变化 包括setState 包括Vdom的种类等等 暂时先不做研究
// 目前这只是一个很小的demo 粗略实现了从vDom到DOM的流程 粗略实现了更新(setState) 实现了props的传值
// 关于diff算法 说实话diff算法真的并不难 就是树的遍历 只不过为了节省性能多了一些判断 市面上现在很多vdom的产品 大致是相同的 但是具体细节不太一样
// 目前这里没有写diff的过程是因为还没想好怎么去更节省性能开销的方式
// 以下为一个思路
/**
 * 我们先遍历两个数组(while语句),维护四个变量
 * 1.遍历oldCh的头索引 - oldStartIdx
 * 2.遍历oldCh的尾索引 - oldEndIdx
 * 3.遍历newCh的头索引 - newStartIdx
 * 4.遍历newCh的尾索引 - newEndIdx
 * 当oldStartIdx > oldEndIdx或者newStartIdx > newOldStartIdx的时候停止遍历。
 * 遍历过程中有五种比较
 * 前四种比较
 * 1.oldStartVnode和newStartVnode,两者elm相对位置不变,若值得(sameVnode)比较,这patch这两个vnode
 * 2.oldEndVnode和newEndVnode,同上,elm相对位置不变,做相同patch检测
 * 3.oldStartVnode和newEndVnode,如果oldStartVnode和newEndVnode值得比较,说明oldCh中的这个oldStartVnode.elm向右移动了。
 * 4.oldEndVnode和newStartVnode,同上,但这是oldVnode.elm向左移,需要调整它的位置
 * 最后一种比较
 * 利用vnode.key,在ul>li*n的结构里,我们很有可能使用key来标志li的唯一性,那么我们就会来到最后一种情况。这个时候,我们先产生一个index-key表(createKeyToOldIdx),然后根据这个表来进行更改
 * 更改规则
 * 1.如果newVnode.key不在表中,那么这个newVnode就是新的vnode,将其插入
 * 2.如果newVnode.key在表中,那么对应的oldVnode存在,我们需要patch这两个vnode,并在patch之后,将这个oldVnode置为undefined(oldCh[idxInOld] = undefined),同时将oldVnode.elm位置变换到当前oldStartIdx之前,以免影响接下来的遍历
 * 遍历结束后,检查四个变量,对移除剩余的oldCh或添加剩余的newCh
 */

import ReactScratch, {ReactScratchDOM} from './reactScratch'
function Welcome (props) {
  return <h1>Hello, {props.name}</h1>
}
class App extends ReactScratch.Component {
  componentWillMount () {
    console.log('componentWillMount1')
  }
  componentDidMount () {
    console.log('componentDidMount1')
  }
  componentWillUpdate () {
    console.log('componentWillUpdate1')
  }
  render () {
    return (
      <div>
        <Welcome name={this.props.name}/>
      </div>
    )
  }
}
class Counter extends ReactScratch.Component {
  constructor (props) {
    super(props)
    this.state = {
      count: 0
    }
  }
  componentWillMount () {
    console.log('componentWillMount')
  }
  componentDidMount () {
    console.log('componentDidMount')
  }
  componentWillUpdate () {
    console.log('componentWillUpdate')
  }
  onClick = () => {
    this.setState({
      count: this.state.count + 1
    })
  }
  render () {
    const {count} = this.state
    // console.log(this.onClick)
    return (
      <div>
        {
          count === 2 ? <p style={{color: 'red', fontSize: 18}} className='test test1' id='ha' data='123'>{count}</p> : <p style={{color: 'green'}} className='test test1' id='ha' data='123'>{count}</p>
        }
        <App name={count}/>
        <Welcome name={count}/>
        <button onClick={this.onClick}>add</button>
      </div>
    )
  }
}
// console.log(Counter.render())
ReactScratchDOM.render(
  <Counter/>,
  document.getElementById('root')
)
