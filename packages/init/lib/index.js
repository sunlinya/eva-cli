'use strict';
import { log } from '@evangelineme/utils';
import Command from '@evangelineme/command';
import createTemplate from './createTemplate.js'
import downloadTemplate from './downloadTemplate.js'
// import installTemplate from './installTemplate.js'

class InitCommand extends Command{
    get command(){
        return 'init [name]'
    }

    get description(){
        return 'init project'
    }

    get options(){
        return [
            ['-f, --force', '是否强制更新', false ]
        ]
    }

    async action([name, opts]){
        log.verbose('init-action', name, opts);
        // 1.选择项目模板，生成项目信息
        const selectedTemplate = await createTemplate(name, opts); 
        log.verbose('selectedTemplate',selectedTemplate)
        // 2.下载项目模板至缓存目录
        await downloadTemplate(selectedTemplate)
        // 3.安装项目模板至项目目录
    }
 
}

function Init(program){
    return new InitCommand(program)
}


export default Init;

