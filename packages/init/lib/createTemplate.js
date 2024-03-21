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
        npmName:'@abbr.sly/template-vue3',
        version:'1.0.1'
    },
    {
        name:'react18项目模板',
        value:'template-react18',
        npmName:'@abbr.sly/template-react18',
        version:'1.0.0'
    },
    {
        name:'vue-element-admin项目模板',
        value:'vue-element-admin',
        npmName:'@abbr.sly/template-vue-element-admin',
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
    const { type, template } = opts;
    // 获取创建类型
    let addType, addName,addTemplate;
    if(type){
        addType = type; 
    }else {
        addType = await getAddType();
    }


    log.verbose('addType',addType);
    if(addType === ADD_TYPE_PROJECT){
        if(name){
            addName = name;
        }else{
            addName = await getAddName();
        }
        log.verbose('addName',addName);

        if(template){
            addTemplate = template;
        }else{
            addTemplate = await getAddtemplate();
        }
        log.verbose('addTemplate',addTemplate);
        const selectedTemplate = ADD_TEMPLATE.find(_=>_.value === addTemplate);
        if(!selectedTemplate){
            throw new Error(`项目模板 ${addTemplate} 不存在！`)
        }
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
    }else{
        throw new Error(`创建的项目类型 ${addType} 不支持`)
    }

}