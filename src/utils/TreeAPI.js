export default {
  getCheckedNodes() {
    if (!this.options.multiple) {
      return null;
    }

    let checkedList = [];
    let testCheckedState = item => {
      if (item.state.checked && !item.children) {
        checkedList.push(item);
      } else if (item.children) {
        item.children.forEach(testCheckedState);
      }
    }

    this.computedData.forEach(testCheckedState);

    return checkedList;
  },

  getSelectedNodes() {
    return this.selectedNodes || null;
  },

  getNodes() {
    return !this.options.multiple ?
      this.selectedNodes :
      this.getCheckedNodes();
  }
}
