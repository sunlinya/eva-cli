import urlJoin from 'url-join'
import axios from 'axios'
import log from './log.js';
function getNpmInfo(npmName){
    const registry = 'https://registry.npmjs.org/';
    const url = urlJoin(registry,npmName);
    return axios.get(url).then(response=>{
        try{
            return response.data;
        }catch(error){
            return Promise.reject(response)
        }
    })
}

export function getLatestVersion(npmName){
    return getNpmInfo(npmName).then(data=>{
        if(!data['dist-tags']?.latest){
            log.error(`${npmName}没有 latest 版本号`);
            return Promise.reject(new Error(`${npmName}没有 latest 版本号`))
        }

        return data['dist-tags']?.latest;
    })
}