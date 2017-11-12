# ptq

## How to use

```jsx
import TaskQueue from 'ptq'

const options = {
  concurrent: 10,
  interval: 0
}
const queue = [1, 2, 3, 4, 5]
const task = (num) => {
  return new Promise((resolve) => {
    resolve(num)  
  })
}

new TaskQueue(queue, task, options).start()
```
