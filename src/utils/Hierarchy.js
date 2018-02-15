import Node from '@/lib/Node'

const defaults = {
  selected: false,
  selectable: true,
  checked: false,
  expanded: false,
  disabled: false,
  visible: true,
  indeterminate: false
};

const extend = Object.assign;


function hierarchy(n, i) {
  let node = new Node(n)
  let state = node.states || {};
  let id = i + 1;

  node.states = extend({}, defaults, state);

  if (undefined === node.id) {
    node.id = node.parent ? `${node.parent.id}.${id}` : '' + id;
  }

  if (node.children) {
    node.children = node.children.map((el, i) => {
      el.parent = node;
      return hierarchy(el, i);
    });
  }

  return node;
}


export default function(data) {
  return data.map(hierarchy);
}
