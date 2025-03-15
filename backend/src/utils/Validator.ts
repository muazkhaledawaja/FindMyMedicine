import { ValidationError } from '../errors'

export class Validator {
    private errors: any[] = [];

    public addError(path: string, value: any, message: string, location: string = "body") {
        this.errors.push({
            type: "field",
            path,
            value,
            msg: message,
            location,
        });
    }

    public check(condition: boolean, path: string, value: any, message: string) {
        if (!condition) {
            this.addError(path, value, message);
        }
    }

    public throwIfErrors(message: string) {
        if (this.errors.length > 0) {
            throw new ValidationError(message, this.errors);
        }
    }
}
