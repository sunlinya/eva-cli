
import path from 'node:path';
import { pathExistsSync } from 'path-exists'
import fse from 'fs-extra'
import ora from 'ora'
import { printErrorLog , log } from '@evangelineme/utils'

import { execa } from 'execa'

function getCacheDir(targetPath){
    return path.resolve(targetPath,'node_modules');
}

function makeCacheDir(targetPath){
    const cacheDir = getCacheDir(targetPath);
    if(!pathExistsSync(cacheDir)){
        fse.mkdirpSync(cacheDir)
    }

}

async function downloadAddTemplate(targetPath,template){
    const { npmName, version } = template;
    const installCommand = 'npm';
    const installArgs = ['install',`${npmName}@${version}`];;
    const cwd = targetPath;
    const subbprocess = execa(installCommand,installArgs,{ cwd });
    await subbprocess;
     

}
export default async function downloadTemplate(selectedTemplate){
    const { targetPath, template } = selectedTemplate;
    makeCacheDir(targetPath);
    const spinner = ora('正在下载模板...').start();
    try{
        await downloadAddTemplate(targetPath,template);
        spinner.stop();
        log.succcess('模板下载成功！')
    }catch(e){
        spinner.stop();
        printErrorLog(e)
    }
}