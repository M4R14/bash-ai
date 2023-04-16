export class CompletionException extends Error {
    constructor(message: string) {
        super(message);

        // Set the prototype explicitly.
        Object.setPrototypeOf(this, CompletionException.prototype);

        this.name = "CompletionException";

        this.message = message;

        this.stack = (new Error(this.message)).stack;
    }
}
