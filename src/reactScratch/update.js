// 组件分为三种, 第一种是自定义组件(updateVComponent), 第二种是标准标签(updateVElement), 第三种是文字节点(updateVText)

function update (prevElement, nextElement) {
  if (prevElement.tag === nextElement.tag) { // 如果tag一样
    if (typeof prevElement.tag === 'string') { // 标准标签
      updateVElement(prevElement, nextElement)
    } else if (typeof prevElement.tag === 'function') { // 自定义组件
      updateVComponent(prevElement, nextElement)
    }
  } else { // TODO 如果tag不一样

  }
}

function updateVElement (prevElement, nextElement) {
  const dom = prevElement.dom
  nextElement.dom = dom
  if (nextElement.props.children) { // 如果有children, 进入updateChildren方法
    updateChildren(prevElement.props.children, nextElement.props.children, dom)
  }
  if (prevElement.style !== nextElement.style) { // 目前只处理style 其他的属性原理一样
    Object.keys(nextElement.style).forEach((s) => {
      dom.style[s] = nextElement.style[s]
    })
  }
}

function updateChildren (prevChildren, nextChildren, parentDOMNode) {
  if (!Array.isArray(nextChildren)) {
    nextChildren = [nextChildren]
  }
  if (!Array.isArray(prevChildren)) {
    prevChildren = [prevChildren]
  }
  for (let i = 0; i < nextChildren.length; i++) {
    const nextChild = nextChildren[i]
    const prevChild = prevChildren[i]
    if (typeof nextChild === 'string' && typeof prevChild === 'string') { // 前后两次都是text的变化
      updateVText(prevChild, nextChild, parentDOMNode) // 调用updateVText方法
      continue // 纯text不会有children 直接跳出
    } else {
      update(prevChild, nextChild) // 继续调用update
    }
  }
}

function updateVText (prevText, nextText, parentDOM) {
  if (prevText !== nextText) {
    parentDOM.firstChild.nodeValue = nextText // 替换文本
  }
}

function updateVComponent (prevComponent, nextComponent) {
  const {instance} = prevComponent // 拿出实例prev-instance 实例赋值发生在mountVComponent函数阶段
  const {currentElement} = instance
  const nextProps = nextComponent.props // 拿出props

  nextComponent.dom = prevComponent.dom
  nextComponent.instance = instance
  nextComponent.instance.props = nextProps

  if (instance.shouldComponentUpdate()) { // 如果shouldComponentUpdate钩子返回true 则update
    const prevRenderedElement = currentElement
    const nextRenderedElement = instance.render()
    nextComponent.instance.currentElement = nextRenderedElement
    update(prevRenderedElement, nextRenderedElement, instance.parentNode)
  }
}
export {
  update
}
