class Queue {
  constructor(queue, task, concurrent = 1) {
    this.queue = queue
    this.task = task
    this.concurrent = concurrent
    this.workers = []
  }

  start() {
    this.interval = setInterval(() => {
      if (!this.queue.length) {
        clearInterval(this.interval)
        this.interval = null
        return
      }
      if (this.workers.length < this.concurrent) {
        let promise = new Promise(resolve => {
          return this.task(this.queue.shift()).then((foo) => {
            this.workers.splice(this.workers.indexOf(promise), 1)
            promise = null
            resolve(foo)
          })
        })
        this.workers.push(promise)
      }
    }, 10)
  }
}

export default Queue
