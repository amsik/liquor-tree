// It has to be like Vue events
// We don't have an instance of Vue here,
// because it would add the whole VueJS library to this library
// Maybe we have more beautiful way...


export default class EventEmmiter {
  constructor() {
    this._events = []

    // it will be instanced later
    this.vm = null
  }

  $on(evnt, fn) {
    if (Array.isArray(evnt)) {
      for (let i = 0; i < evnt.length; i++) {
        this.$on(evnt[i], fn)
      }
    } else {
      (this._events[evnt] || (this._events[evnt] = [])).push(fn)
    }

    return this
  }

  $off(evnt, fn) {
    if (!evnt && !fn) {
      this._events.length = 0
      return this
    }

    if (Array.isArray(evnt)) {
      for (let i = 0; i < evnt.length; i++) {
        this.$off(evnt[i], fn)
      }

      return this
    }

    const cbs = this._events[evnt]

    if (!cbs) {
      return this
    }

    if (!fn) {
      this._events[evnt] = null
    } else {
      let cb;
      let i = cbs.length

      while(i--) {
        cb = cbs[i]

        if (cb === fn || cb.fn === fn) {
          cbs.splice(i, 1)
          break
        }
      }
    }

    return this
  }

  $once(evnt, fn) {
    let on = (...args) => {
      this.$off(evnt, on)
      fn.apply(this.vm, args)
    }

    on.fn = on
    this.$on(evnt, on)

    return this
  }

  $emit(evnt, ...args) {
    let cbs = this._events[evnt]

    if (cbs) {
      for (let i = 0; i < cbs.length; i++) {
        cbs[i].apply(this.vm, args)
      }
    }

    return this
  }
}
