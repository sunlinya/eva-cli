#!/usr/bin/env node

import importLocal from 'import-local'
import entry from '../lib/index.js'
import { fileURLToPath } from 'node:url'
import { log } from '@noah/utils'
// import { filename } from 'dirname-filename-esm'


/** es module模块内置是没有 __filename 变量的 需要自己实现, 也可以直接用库*/
const __filename = fileURLToPath(import.meta.url)

if(importLocal(__filename)){
    log.info('cli','使用本次 cli版本')
}else{
    entry(process.argv.slice(2))
}


