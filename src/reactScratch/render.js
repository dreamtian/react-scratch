function render (vnode, parentNode) {
  // console.log(vnode, parentNode)
  if (vnode === undefined || vnode === null || typeof vnode === 'boolean') {
    return
  }
  if (vnode.isReactComponent) {
    const {attrs} = vnode
    const instance = vnode
    // const instance = new Component(attrs)
    const base = render(instance.render(), parentNode)
    if (!instance.base) {
      if (instance.componentWillMount) instance.componentWillMount()
    } else if (instance.componentWillReceiveProps) {
      instance.componentWillReceiveProps(attrs)
    }
    if (instance.base && instance.componentWillUpdate) {
      instance.componentWillUpdate()
    }
    if (instance.base) {
      if (instance.componentDidUpdate) instance.componentDidUpdate()
    } else if (instance.componentDidMount) {
      instance.componentDidMount()
    }
    if (instance.base && instance.parentNode) {
      instance.parentNode.replaceChild(base, instance.base)
    }
    instance.base = base
    instance.parentNode = parentNode
    return base
  }
  // console.log(vnode)
  if (typeof vnode === 'string' || typeof vnode === 'number') {
    parentNode.textContent = vnode
    return parentNode
  }
  const dom = document.createElement(vnode.tag)
  const {attrs} = vnode
  if (attrs) {
    for (const attr in attrs) {
      if (attrs[attr] === void 888) {
        return
      }
      if (typeof attrs[attr] === 'function' && attr.startsWith('on')) {
        const eventType = attr.slice(2).toLowerCase()
        dom.handlers = dom.handlers || {}
        dom.removeEventListener(eventType, dom.handlers[eventType])
        dom.handlers[eventType] = attrs[attr]
        dom.addEventListener(eventType, dom.handlers[eventType])
      } else if (typeof attrs[attr] !== 'object') {
        if (attr === 'className') {
          dom.setAttribute('class', attrs[attr])
        }
        dom.setAttribute(attr, attrs[attr])
      } else if (attr === 'style') {
        const style = attrs[attr]
        for (const styleKey in style) {
          dom.style[styleKey] = typeof style[styleKey] === 'number' ? getNumberStyleValue(styleKey, style[styleKey]) : style[styleKey]
        }
      }
    }
  }
  vnode.children.forEach(child => render(child, dom))
  // console.log(parentNode)
  return parentNode.appendChild(dom)
}
function getNumberStyleValue (styleKey, value) {
  switch (styleKey) {
    case 'animationIterationCount':
    case 'borderImageOutset':
    case 'borderImageSlice':
    case 'borderImageWidth':
    case 'boxFlex':
    case 'boxFlexGroup':
    case 'boxOrdinalGroup':
    case 'columnCount':
    case 'fillOpacity':
    case 'flex':
    case 'flexGrow':
    case 'flexNegative':
    case 'flexOrder':
    case 'flexPositive':
    case 'flexShrink':
    case 'floodOpacity':
    case 'fontWeight':
    case 'gridColumn':
    case 'gridRow':
    case 'lineClamp':
    case 'lineHeight':
    case 'opacity':
    case 'order':
    case 'orphans':
    case 'stopOpacity':
    case 'strokeDasharray':
    case 'strokeDashoffset':
    case 'strokeMiterlimit':
    case 'strokeOpacity':
    case 'strokeWidth':
    case 'tabSize':
    case 'widows':
    case 'zIndex':
    case 'zoom':
      return value
    default:
      return value + 'px'
  }
}
export {
  render
}
