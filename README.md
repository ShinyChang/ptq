# ptq

## How to use

### 1. Simple task queue

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

### 2. Generate thumbnail task

```jsx
import {promisify} from 'util';
import TaskQueue from 'ptq'
import path from 'path';
import sharp from 'sharp';
import glob from 'glob';
const globPromisify = promisify(glob);

const dest = `${path.resolve(__dirname)}/160`;
globPromisify(`${path.resolve(__dirname)}/480/*`).then(files => {
  const task = file => {
    const filename = file.split('/').pop();
    return sharp(file).toFile(`${dest}/${filename}`);
  };
  new TaskQueue(files, task, {concurrent: 255}).start();
});
```
