import TreeRoot from '@/components/TreeRoot'
import TreeNode from '@/components/TreeNode'

const install = Vue => {
  Vue.component(TreeRoot.name, TreeRoot)
  Vue.component(TreeNode.name, TreeNode)
}

TreeRoot.install = install

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(TreeRoot)
}

export default TreeRoot

export { TreeRoot, TreeNode }
