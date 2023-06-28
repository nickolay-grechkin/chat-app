import {IToken} from "./common/interfaces/token";
import * as jwt from "jsonwebtoken";

class Token implements IToken {

    public create<T extends Record<string, unknown>>(payload: T): string {
        const expiresIn = process.env.EXPIRES_IN ?? '';
        const secret = process.env.SECRET_KEY ?? '';

        return jwt.sign(payload, secret, { expiresIn })
    }
    // TODO Add type
    public decode(token: string): any {
        const secret = process.env.SECRET_KEY ?? '';

        return jwt.verify(token, secret, (err, payload) => {
            if (err) {
                return { err, payload: undefined }
            }
            return { err: undefined, payload };
        });
    }
}

export { Token };
