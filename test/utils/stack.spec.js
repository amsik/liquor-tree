import { List } from '@/utils/stack'

describe('utils: stack', () => {
  it('init', () => {
    const stack = new List(1, 2, 3)

    expect(stack).toEqual([1, 2, 3])
    expect(stack).toBeInstanceOf(Array)
  })

  it('stack methods', () => {
    const stack = new List(1, 2, 3, 4, 5)

    expect(stack).toHaveLength(5)

    stack.add(6, 7, 8)
    expect(stack).toHaveLength(8)

    stack.empty()
    expect(stack).toHaveLength(0)

    stack.add(1, 2, 3)
    stack.remove(2)

    expect(stack).toEqual([1, 3])
    expect(stack.top()).toBe(3)

    stack.add(1, 1, 2, 4)
    stack.removeAll(1)

    expect(stack).toEqual([3, 2, 4])
  })
})
