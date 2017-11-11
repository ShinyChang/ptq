# ptq

## How to use

```jsx
import TaskQueue from 'ptq'

const queue = [1, 2, 3, 4, 5]
const task = (num) => {
  return new Promise((resolve) => {
    resolve(num)  
  })
}

new TaskQueue(queue, task, 3).start()
```
