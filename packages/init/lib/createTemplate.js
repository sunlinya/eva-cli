import { log, makeList,makeInput,getLatestVersion } from '@evangelineme/utils'
import { homedir } from 'node:os'
import path from 'node:path'
const ADD_TYPE_PAGE = 'page';
const ADD_TYPE_PROJECT = 'project';

// 缓存目录
const TEMP_HOME = '.abbr_cache'


const ADD_TEMPLATE = [
    {
        name:'vue3项目模板',
        value:'template-vue3',
        npmName:'@evangelineme/template-vue3',
        version:'1.0.1'
    },
    {
        name:'react18项目模板',
        value:'template-react18',
        npmName:'@evangelineme/template-react18',
        version:'1.0.0'
    }
];

const ADD_TYPE = [
    { name: '项目' , value: ADD_TYPE_PROJECT},
    { name: '页面', value: ADD_TYPE_PAGE }
]

function getAddType(){
    return makeList({
        choices: ADD_TYPE,
        message:'请选择初始化类型',
        defaultValue: ADD_TYPE_PROJECT
    })
}

// 获取项目名称
function getAddName(){
    return makeInput({
        message: '请输入项目名称',
        defaultValue: '',
        validate(v){
            if(v.length > 0){
                return true
            }
            return '项目名称必须输入'
        }
    })
}

// 获取项目模板
function getAddtemplate(){
    return makeList({
        choices:ADD_TEMPLATE,
        message:"请选择项目模板"
    })
}



// 安装缓存目录

function makeTargetPath(){
    return path.resolve(`${homedir()}/${TEMP_HOME}`,'addTemplate')
}

export default async function createTemplate(name,opts){
    // 获取创建类型
    const addType = await getAddType();
    log.verbose('addType',addType);
    if(addType === ADD_TYPE_PROJECT){
        const addName = await getAddName();
        log.verbose('addName',addName);
        const addTemplate = await getAddtemplate();
        log.verbose('addTemplate',addTemplate);
        const selectedTemplate = ADD_TEMPLATE.find(_=>_.value === addTemplate);
        log.verbose('selectedTemplate',selectedTemplate);
        // 获取最新版本号
        const latestVersion = await getLatestVersion(selectedTemplate.npmName);
        log.verbose('latestVersion',latestVersion);
        selectedTemplate.version = latestVersion;

        const targetPath = makeTargetPath();
        return {
            type: addType,
            name: addName,
            template: selectedTemplate,
            targetPath
        }
    }

}