
import { log, isDebug,printErrorLog} from '@evangelineme/utils';
process.on('uncaughtException',e=>printErrorLog(e,'error'))
process.on('unhandledRejection',e=>printErrorLog(e,'promise'))