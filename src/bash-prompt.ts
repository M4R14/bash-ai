const environment = () => {
    // get os name
    const os = require('os');
    const osName = os.type();

    // get os version
    const osVersion = os.release();

    // list all files in current directory
    const fs = require('fs');
    const files = fs.readdirSync('./');

    // get current directory
    const currentDir = process.cwd();

    // get current user
    const currentUser = process.env.USER;

    // get current user home directory
    const homeDir = process.env.HOME;

    // get current user shell
    const shell = process.env.SHELL;

    // get current user terminal
    const terminal = process.env.TERM;

    // get current user editor
    const editor = process.env.EDITOR;

    // get current user language
    const language = process.env.LANG;

    // get current time zone
    const timeZone = process.env.TZ;


    const env = {
        osName,
        osVersion,
        files,
        currentDir,
        currentUser,
        homeDir,
        shell,
        terminal,
        editor,
        language,
        timeZone,
    }

    return Object.entries(env).map(([key, value]) => {
        return `- ${key}: ${value}`;
    }).join("\n");
}

export class BashPrompt {
    private environment: string = [
        '- os: Linux',
    ].join("\n");

    private answeringQuestions: string = [
        '- pick one command for answer',
        '- answer must be one line',
        '- don\'t use "Answer:"',
        '- case mutiple answers, use "&&" for connect commands (ex: "git add . && git commit -m \'message\'")',
        '- if you can answer, write "$ <your answer>"',
        '- if you can\'t answer, write "!! <your answer>"',
        '- if you don\'t know, write "?? <your answer>"',
    ].join("\n");

    constructor(
        private question: string,
        options?: {
            environment?: string;
            answeringQuestions?: string;
        }
    ) {
        if (options?.environment) {
            this.environment = options.environment;
        } else {
            this.environment = environment();
        }

        if (options?.answeringQuestions) {
            this.answeringQuestions = options.answeringQuestions;
        }
    }

    public getPrompt(): string {
        return [
            "Environment:",
            this.environment,
            "",
            "Answering questions:",
            this.answeringQuestions,
            "",
            "Question:",
            `i need command for ${this.question}. give me command.`,
        ].join("\n");
    }

    // magic method for get prompt
    public toString(): string {
        return this.getPrompt();
    }
}
