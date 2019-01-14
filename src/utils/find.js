function striptags (value) {
  // ssr fix
  if (!!document === false) {
    return value
  }

  if (!striptags.__element) {
    striptags.__element = document.createElement('div')
  }

  striptags.__element.innerHTML = value
  return striptags.__element.innerText
}

function finder (criteria) {
  return function (node) {
    return Object.keys(criteria).every(key => {
      if (key === 'text' || key === 'id') {
        const c = criteria[key]
        let val = node[key]

        // remove html tags
        val = striptags(val)

        if (isRegExp(c)) {
          return c.test(val)
        } else {
          return c === val
        }
      }

      const states = criteria[key]

      // it is possible to pass 'states' or 'state'
      if (key === 'state') {
        key = 'states'
      }

      return Object.keys(states).every(s => node[key][s] === states[s])
    })
  }
}

function isRegExp (val) {
  return val instanceof RegExp
}

function getAllChildren (source) {
  const result = []

  source.forEach(function collect (node) {
    result.push(node)

    if (node.children) {
      node.children.forEach(collect)
    }
  })

  return result
}

export default function find (source, criteria, deep = true) {
  if (!source || !source.length || !criteria) {
    return null
  }

  if (deep) {
    source = getAllChildren(source)
  }

  // find by index
  if (typeof criteria === 'number') {
    return source[criteria] || null
  }

  if (typeof criteria === 'string' || criteria instanceof RegExp) {
    criteria = {
      text: criteria
    }
  }

  if (typeof criteria !== 'function') {
    criteria = finder(criteria)
  }

  const result = source.filter(criteria)

  if (result.length) {
    return result
  }

  return null
}
