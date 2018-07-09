// babel具体转译的结果可以在babel官网看实例 https://babeljs.io/repl
function createElement (tag, attrs, ...children) {
  if (tag.prototype && tag.prototype.render) {
    const Component = tag
    return new Component(attrs)
  } else if (typeof tag === 'function') {
    return tag(attrs || {})
  } else {
    return {
      tag,
      attrs,
      children
    }
  }
}

export {
  createElement
}
