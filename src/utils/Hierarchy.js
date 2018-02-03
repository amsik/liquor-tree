const defaults = {
  selected: false,
  opened: false,
  disabled: false,
  checked: false,
  mixed: false
};

const extend = Object.assign;

function hierarchy(node, i) {
  let state = node.state || {};
  let id = i + 1;

  node.state = extend({}, defaults, state);

  if (undefined === node.id) {
    node.id = node.parent ? `${node.parent.id}.${id}` : '' + id;
  }

  if (node.children) {
    node.children.forEach((el, i) => {
      el.parent = node;
      hierarchy(el, i);
    });
  }

  return node;
}


export default function(data) {
  return data.map(hierarchy);
}
