import Vue from 'vue'

import Node from '@/lib/Node'
import Tree from '@/lib/Tree'

const log = a => console.log(JSON.stringify(a))

const vm = new Vue()
vm.options = {}

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

  it('recurse functions', () => {
    const n = {}
    const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']

    letters.forEach(letter => {
      n[letter] = new Node(tree, { text: letter })
    })

    const emulatedTree = n.A.children.push(
      n.B, n.C, n.D
    )

    n.B.parent = n.C.parent = n.D.parent = n.A

    n.D.children.push(n.E)
    n.E.parent = n.D

    n.E.children.push(n.F)
    n.F.parent = n.E

    n.F.children.push(n.G)
    n.F.children.push(n.H)
    n.G.parent = n.F
    n.H.parent = n.F

    const recurseUpArray = []
    const recurseUpStoppedArray = []

    n.G.recurseUp(node => {
      recurseUpArray.push(node.text)
    })

    n.G.recurseUp(node => {
      recurseUpStoppedArray.push(node.text)

      if (node.text === 'E') {
        return false
      }
    })

    expect(recurseUpArray).toEqual(['F', 'E', 'D', 'A'])
    expect(recurseUpStoppedArray).toEqual(['F', 'E'])

    const A_recurseDownArray = []
    const F_recurseDownArray = []
    const F_exclude_sefl_recurseDownArray = []

    n.A.recurseDown(node => {
      A_recurseDownArray.push(node.text)
    })

    n.F.recurseDown(node => {
      F_recurseDownArray.push(node.text)
    })

    n.F.recurseDown(node => {
      F_exclude_sefl_recurseDownArray.push(node.text)
    }, true)

    expect(A_recurseDownArray).toEqual(['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'])
    expect(F_recurseDownArray).toEqual(['F', 'G', 'H'])
    expect(F_exclude_sefl_recurseDownArray).toEqual(['G', 'H'])
  })

  it('node selection', () => {
    const node = new Node(tree, { text: 'Test node' })

    // Start testig with objectToNode

    // node.select()
    // expect(node.state('selected')).toBeTruthy()
  })
})
