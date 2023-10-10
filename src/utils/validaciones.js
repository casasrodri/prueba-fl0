export const validarFaltantes = (errorMsj, variables) => {
    let faltantes = '';
    Object.entries(variables).forEach(([key, value]) => {
        if (!value) {
            // faltantes.push(key);
            faltantes += `   - ${key}: ${value}\n`;
        }
    });

    if (Object.keys(faltantes).length > 0) {
        throw new Error(`${errorMsj}\n  Datos faltantes:\n${faltantes}`);
    }
};
