import Jwt  from "jsonwebtoken";


const TOKEN_SECRET = process.env.TOKEN_SECRET || "secet";
export function createAccesToken(payload: any) {
    return new Promise((resolve, reject) => {
        Jwt.sign(
            payload,
            TOKEN_SECRET,
            {expiresIn: '1d'}, 
            (err, token) => {
                if (err) reject(err);
                resolve(token)
            });
    })
}