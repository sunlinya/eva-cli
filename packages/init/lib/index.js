'use strict';
import { log } from '@evangelineme/utils';
import Command from '@evangelineme/command';

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

    action([name, opts]){
        log.verbose('init-action', name, opts)
    }
 
}

function Init(program){
    return new InitCommand(program)
}


export default Init;

