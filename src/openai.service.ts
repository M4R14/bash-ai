import { Configuration, OpenAIApi } from "openai";

export default class OpenAiService {
    private openai: OpenAIApi;

    private model: string = "text-davinci-003";

    constructor() {
        const configuration = new Configuration({
            // apiKey: "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",
            apiKey: process.env.OPENAI_API_KEY,
        });

        const openai = new OpenAIApi(configuration);

        this.openai = openai;
    }

    // createCompletion
    public async createCompletion(prompt: string): Promise<any> {
        return await this.openai.createCompletion({
            model: this.model,
            prompt: prompt,
        });
    }
}