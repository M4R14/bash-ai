import { Logger } from "./logger";

export class ChildProcess {
    private logger: Logger = new Logger(ChildProcess.name);

    public run(command: string) {
        const logger = this.logger;
        const { spawn } = require('node:child_process');

        const child = spawn(command, {
            shell: true,
            stdio: 'inherit'
        });

        child.on('exit', function (code: any, signal: any) {
            logger.debug(`child process exited with ` +
                `code ${code} and signal ${signal}`);
        });

        child.on('error', function (err: any) {
            logger.error(`child process error: ${err}`);
        });

        child.on('message', function (message: any) {
            logger.debug(`child process message: ${message}`);
        });

        child.on('disconnect', function () {
            console.debug('child process disconnect');
        });

        child.on('close', function (code: any) {
            logger.debug(`child process close: ${code}`);
        });
    }
}
