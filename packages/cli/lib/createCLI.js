import { program } from 'commander';
import path from 'node:path'
import { log, isDebug } from '@evangelineme/utils'
import semver from 'semver';
import chalk from 'chalk';
import { dirname } from 'dirname-filename-esm'
import fs from 'fs-extra'


const __dirname = dirname(import.meta);
const pkgPath = path.resolve(__dirname,'../package.json');
const pkg = fs.readJSONSync(pkgPath);

const LOWEST_NODE_VERSION = '14.0.0';

function checkNodeVersion(){
    log.verbose('node version',process.version)
    if(!semver.gte(process.version, LOWEST_NODE_VERSION)){{
        throw new Error(chalk.red(`node版本过低，需要安装${LOWEST_NODE_VERSION}及以上的版本！`  ))
    }}
}

function preAction(){
    checkNodeVersion()
}



export default function createCLI(){

    log.info('version', pkg.version);
  
    program
        .name(Object.keys(pkg.bin)[0])
        .usage('<command> [options]')
        .version(pkg.version)
        .option('-d, --debug', '是否开启调试模式',false)
        .hook('preAction',preAction );

    program.on('option:debug',function(){
        if(program.opts().debug){
            log.verbose('debug','launch debug mode!')
        }
    })

    program.on('command:*',function(obj){
        log.error('未知的命令:' + obj[0])
    })

    return program;
}

