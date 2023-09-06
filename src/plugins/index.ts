// 插件代码

import {PluginOption} from "vite";
import stripJsonComments from "./stripJsonComments";

const path = require('path');
const fs = require('fs');
const rootPath = process.env.UNI_INPUT_DIR || (process.env.INIT_CWD + '\\src')
const rootPathStr = rootPath?.replace(/\\/g, '/')
const flatSubPackages = (subPackages: any[]) => {
    return subPackages?.map(item => item?.pages.map((row: any) => {
        return `${rootPathStr}/${item.root}/${row.path}.vue`
    }))?.flat() ?? [];
}


const initPages = (RootPath = rootPath) => {
    const pagesJson = path.resolve(RootPath, 'pages.json');
    const {pages, subPackages} = JSON.parse(stripJsonComments(fs.readFileSync(pagesJson, 'utf-8')))
    return [...pages.map(({path}: any) => `${rootPathStr}/${path}.vue`), ...flatSubPackages(subPackages)]
}
const removeQueryString = (path: string) => {
    if (path.includes('?')) {
        const queryString = path.substring(path.indexOf('?'));
        return path.replace(queryString, '');
    }
    return path
};
export default function (options: any[]): PluginOption {
    if (!Array.isArray(options)) {
        console.error('请填入数组 string[]')
        return
    }
    return {
        name: 'vite-uni-insert-element',
        // enforce: 'post',
        transform(content, path) {
            let pages = initPages()

            if (pages.includes(removeQueryString(path))) {
                let tags = options?.join('')
                return content.replace(/(\<template\>\s*\<.+?\>)/, "$1" + tags)
            }

        },

    }
}

