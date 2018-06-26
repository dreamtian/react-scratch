// mount阶段也对应三种类型的虚拟dom
function mount (value, parentNode) {
  if (typeof value === 'string' || typeof value === 'number') { // 文本节点
    return mountVText(value, parentNode)
  } else if (typeof value.tag === 'string') { // html标签
    return mountVElement(value, parentNode)
  } else if (typeof value.tag === 'function') { // 自定义组件
    return mountVComponent(value, parentNode)
  }
}
function mountVComponent (vComponent, parentNode) {
  const {tag, props} = vComponent
  const Component = tag
  const instance = new Component(props) // 创建自定义组件实例
  const currentElement = instance.render() // 拿到自定义组件的渲染的内容
  instance.currentElement = currentElement
  instance.parentNode = parentNode
  const dom = mount(currentElement, parentNode) // 真实dom
  vComponent.instance = instance // !!! 每个自定义组件都要有instance 在update阶段此处instance作为上一次的render dom
  vComponent.dom = dom
  parentNode.appendChild(dom)
  return dom
}

function mountVText (vText, parentNode) {
  parentNode.textContent = vText // 没啥好说的  直接替换内容
}

function mountVElement (vElement, parentNode) {
  const {tag, className, props, style} = vElement
  const domNode = document.createElement(tag)
  vElement.dom = domNode
  if (props.children) { // 没啥好说的 就一个递归
    if (Array.isArray(props.children)) {
      // 递归创建
      props.children.map(child => {
        mount(child, domNode)
      })
    } else {
      mount(props.children, domNode)
    }
  }
  if (className) {
    domNode.className = className
  }
  if (style) {
    Object.keys(style).map((sKey) => {
      domNode.style[sKey] = style[sKey]
    })
  }
  parentNode.appendChild(domNode)
  return domNode
}
export {
  mount
}
