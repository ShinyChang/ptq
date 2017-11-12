class Queue {
  constructor(queue, task, options = {}) {
    this.queue = [...queue]
    this.task = task
    this.concurrent = options.concurrent || 1
    this.interval = options.interval || 0
    this.workers = []
    this.results = []
  }

  tick(resolve) {
    if (!this.queue.length) {
      clearTimeout(this.timer)
      this.timer = null
      return resolve(this.results)
    }
    if (this.workers.length < this.concurrent) {
      let promise = new Promise(resolve => {
        let params = this.queue.shift()
        if (typeof params !== 'function') {
          params = [params]
        }
        return this.task.apply(null, params).then((result) => {
          this.workers.splice(this.workers.indexOf(promise), 1)
          this.results.push(result)
          promise = null
          resolve()
        })
      })
      this.workers.push(promise)
    }
    this.timer = setTimeout(this.tick.bind(this, resolve), this.interval)
  }

  start() {
    return new Promise(resolve => {
      this.timer = setTimeout(this.tick.bind(this, resolve), this.interval)
    })
  }
}

export default Queue
