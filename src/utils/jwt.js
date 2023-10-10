import jwt from 'jsonwebtoken';

export const PRIVATE_KEY =
    'MIICXwIBAAKBgQDdd882sR2j1pF6pnNollM5z79g5ja0QnuJDpwWAsq2hhtnZT9h';

export const generarToken = (usuario) => {
    const token = jwt.sign({ usuario }, PRIVATE_KEY, { expiresIn: '2h' }); //2h
    return token;
};
