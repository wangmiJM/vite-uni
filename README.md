
### use npm i vite-uni-insert-element
#### willAutomaticallyIndex pages.json thePages
```js
import {defineConfig} from 'vite'
import uni from '@dcloudio/vite-plugin-uni'
import InsertElementPlugin from "vite-uni-insert-element";


export default defineConfig({
    plugins: [
        InsertElementPlugin(['<view></view>','<alert></alert/>']),
        uni(),
    ],
})

```
