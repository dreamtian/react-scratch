// TODO 自定义Component 增加 children 属性
// 此处目前和react的方式不同 便于理解先区分开createVComponent createVElement
// react虚拟dom {tag, props: {}, ...children}
function createElement (tag, props, children) {
  if (typeof tag === 'function') {
    const vNode = createVComponent(tag, props)
    return vNode
  }
  const vNode = createVElement(tag, props, children)
  return vNode
}

function createVComponent (tag, props) {
  // 以下return的形式可以自己format 只要和mount对应上就可以
  return {
    tag, // 在自定义组件里tag就是对应的Component衍生类 (function)
    props, // react 的props
    dom: null // 对应的真实dom (ref???)
  }
}

function createVElement (tag, attr, children = null) {
  const {className, style} = attr
  // 以下return的形式可以自己format 只要和mount对应上就可以
  return {
    tag, // html标签
    props: {
      children // 把children放到props里
    },
    className, // class
    dom: null, // 对应的真实dom (ref???)
    style // style
  }
}
export {
  createElement
}
