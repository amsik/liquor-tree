const defaults = {
    selected: false,
    opened: false,
    disabled: false,
    checked: false
};

const extend = Object.assign;

function hierarchy(node) {
    let state = node.state || {};

    node.state = extend({}, defaults, state);

    if (node.children) {
        node.children.forEach(hierarchy);
    }

    return node;
}


export default function hierarchy(data) {
    return data.map(hierarchy);
}
