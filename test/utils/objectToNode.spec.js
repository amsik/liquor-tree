import objectToNode from '@/utils/objectToNode'
import Node from '@/lib/Node'

const nodeStates = {
  selected: false,
  selectable: true,
  checked: false,
  expanded: false,
  disabled: false,
  visible: true,
  matched: false,
  indeterminate: false,
  editable: true
}

const tree = {}

describe('utils: objectToNode.js', () => {
  it('ignore Node instance', () => {
    const node = new Node(tree, { id: 10 })
    const newNode = objectToNode(tree, node)

    expect(newNode).toBe(node)
  })

  it('parse string', () => {
    const node = objectToNode(tree, 'New Node')

    expect(node.text).toBe('New Node')
    expect(node.states).toEqual(nodeStates)
    expect(node.id).toMatch(/\w{8}-\w{4}-\w{4}-\w{4}-\w{8}/)
  })

  it('parse object', () => {
    const node = objectToNode(tree, {
      text: 'Node 1',
      id: 10,
      state: {
        selected: true, visible: false
      },
      data: {
        mySuperProp: 'atatat'
      }
    })

    // merge states
    expect(node.states).toEqual(
      Object.assign({}, nodeStates, { selected: true, visible: false })
    )

    expect(node.id).toBe(10)
    expect(node.data.mySuperProp).toBe('atatat')
  })

  it('node children as object', () => {
    const node = objectToNode(tree, {
      text: 'Item 1',
      children: [
        { text: 'Item 1.1', parent: 15 }, // ignoring parent
        { text: 'Item 1.2' },
        { text: 'Item 1.3' }
      ]
    })

    expect(node.children).toHaveLength(3)
    expect(node.children[0].parent).toBe(node)
  })

  it('node children as text', () => {
    const node = objectToNode(tree, {
      text: 'Item 1',
      children: [
        'Item 1.1', 'Item 1.2', 'Item 1.3'
      ]
    })

    expect(node.children).toHaveLength(3)
    expect(node.children[1].text).toBe('Item 1.2')
  })

  it('some child as Node', () => {
    const childNode = new Node(tree, { text: 'Item 1.1' })
    const node = objectToNode(tree, {
      text: 'Item 1',
      children: [
        childNode, 'Item 1.2', 'Item 1.3'
      ]
    })

    expect(node.children).toHaveLength(3)
    expect(node.children[0]).toBe(childNode)
  })
})
