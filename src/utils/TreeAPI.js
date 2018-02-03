export default {
  getChecked() {
    if (!this.options.checkbox) {
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

  getSelected() {
    return this.selectedNodes || null;
  },

  getValue() {
    return !this.options.checkbox ?
      this.selectedNodes :
      this.getChecked();
  }
}
