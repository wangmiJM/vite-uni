import {resolve} from 'node:path'

import {defineConfig} from 'vite'
// import dts from 'vite-plugin-dts'

export default defineConfig({
    plugins:[

    ],

    build: {
        // outDir: "lib", // 打包后存放的目录文件
        lib: {
            // Could also be a dictionary or array of multiple entry points
            entry: resolve(__dirname, 'src/plugins/index.ts'),
            name: 'vite-uni-insert-element',
            // the proper extensions will be added
            fileName: (format) => `vite-uni-insert-element.${format}.js`,
        },

        // rollupOptions: {
        //     // 确保外部化处理那些你不想打包进库的依赖
        //     external: ['vue'],
        //     output: {
        //         // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        //         globals: {
        //             vue: 'Vue',
        //         },
        //     },
        // },
    }
})
