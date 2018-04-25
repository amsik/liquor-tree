import Vue from 'vue'

import Node from '@/lib/Node'
import Tree from '@/lib/Tree'

import objectToNode from '@/utils/objectToNode'

const vm = new Vue()
vm.opts = {}

const tree = new Tree(vm)

describe('Lib: Node.js', () => {
  it('node constructor arguments', () => {
    expect(() => { new Node() }).toThrowError('Node can not be empty')
    expect(() => { new Node(null, {}) }).toThrowError('Node must has a Tree context!')

    // TODO: whether to check Tree instance?
  })

  it('node\'s specified and auto generated id', () => {
    const node0 = new Node(tree, { id: 10 })
    const node1 = new Node(tree, {})

    expect(node0.id).toBe(10)
    expect(node1.id).toMatch(/\w{8}-\w{4}-\w{4}-\w{4}-\w{8}/)  // example: 4097b198-bba3-678d-f61c-d72a40bfd0a7
  })

  it('node data object (text migrates to data property)', () => {
    const node = new Node(tree, {
      text: 'My Text',
      data: { someDataProp: true }
    })

    expect(node.data).toEqual({
      text: 'My Text',
      someDataProp: true
    })
  })

  it('change node text', () => {
    const node = new Node(tree, {
      text: 'My Text'
    })

    expect(node.text).toBe('My Text')

    node.text = 'Changed text'

    expect(node.text).toBe('Changed text')
  })

  it('check node states', () => {
    const node = new Node(tree, {
      text: 'My Text',
      state: {
        checked: true,
        selected: false
      }
    })

    expect(node.state('checked')).toBeTruthy()
    expect(node.state('selected')).toBeFalsy()

    node.state('checked', false)
    expect(node.state('checked')).toBeFalsy()

    // unexisted state
    node.state('UNREAL_state', true)
    expect(node.state('UNREAL_state')).toBeTruthy()
  })

  it('node depth', () => {
    const childNode = objectToNode(tree, { text: 'Item 1.4.2', children: ['Some node'] })
    const node = objectToNode(tree, {
      text: 'Item 1',
      children: [
        'Item 1.2',
        childNode
      ]
    })

    expect(node.depth).toBe(0)
    expect(childNode.depth).toBe(1)
    expect(childNode.children[0].depth).toBe(2)
  })

  it('recurse functions', () => {
    const childNode = objectToNode(tree, { text: 'Item 1.4.2', children: [
      'Item 1.4.2.1', 'Item 1.4.2.2'
    ] })

    const node = objectToNode(tree, {
      text: 'Item 1',
      children: [
        'Item 1.2',
        'Item 1.3',
        {
          text: 'Item 1.4',
          children: [
            'Item 1.4.1', childNode, 'Item 1.4.3'
          ]
        },
        {
          text: 'Item 1.5'
        }
      ]
    })

    const recurseDownExpected = [
      'Item 1', 'Item 1.2', 'Item 1.3',
      'Item 1.4', 'Item 1.4.1', 'Item 1.4.2', 'Item 1.4.2.1', 'Item 1.4.2.2',
      'Item 1.4.3', 'Item 1.5'
    ]

    const recurseDownArray = []

    node.recurseDown(n => {
      recurseDownArray.push(n.text)
    })

    const recurseDownArrayIgnoreTargetExpected = ['Item 1.4.2.1', 'Item 1.4.2.2']
    const recurseDownArrayIgnoreTarget = []

    childNode.recurseDown(n => {
      recurseDownArrayIgnoreTarget.push(n.text)
    }, true)

    const recurseUpExpected = ['Item 1.4.2', 'Item 1.4', 'Item 1']
    const recurseUpArray = []

    childNode.children[0].recurseUp(n => {
      recurseUpArray.push(n.text)
    })

    expect(recurseDownArray).toEqual(recurseDownExpected)
    expect(recurseUpArray).toEqual(recurseUpExpected)
    expect(recurseDownArrayIgnoreTarget).toEqual(recurseDownArrayIgnoreTargetExpected)
  })

  it('node selection', () => {
    const tree = new Tree(vm)
    const model = tree.parse({
      text: 'Node', state: {
        selected: false
      }
    })

    tree.setModel(model)

    const node = tree.model[0]

    expect(node.selected()).toBeFalsy()
    node.select()
    expect(node.selected()).toBeTruthy()

    node.unselect()
    expect(node.selected()).toBeFalsy()

    node.state('selectable', false)
    node.select()

    expect(node.selected()).toBeFalsy()
  })

  it('node check', () => {
    const tree = new Tree(vm)
    const model = tree.parse({
      text: 'Node', state: {
        checked: false
      }
    })

    tree.setModel(model)

    const node = tree.model[0]

    expect(node.checked()).toBeFalsy()
    node.check()
    expect(node.checked()).toBeTruthy()
  })

  it('node visible', () => {
    const tree = new Tree(vm)
    const model = tree.parse({
      text: 'Node'
    })

    tree.setModel(model)

    const node = tree.model[0]

    expect(node.visible()).toBeTruthy()

    node.hide()
    expect(node.hidden()).toBeTruthy()
    expect(node.visible()).toBeFalsy()
  })

  it('node enable', () => {
    const tree = new Tree(vm)
    const model = tree.parse({
      text: 'Node 0', children: [
        'Node 01', 'Node 02'
      ]
    })

    tree.setModel(model)

    const node = tree.model[0]

    node.disable()

    expect(node.disabled()).toBeTruthy()
    expect(node.enabled()).toBeFalsy()

    const childNode = node.children[0]
    expect(childNode.disabled()).toBeTruthy()

    node.enable()

    expect(node.disabled()).toBeFalsy()
    expect(node.enabled()).toBeTruthy()
    expect(childNode.enabled()).toBeTruthy()
  })
})
