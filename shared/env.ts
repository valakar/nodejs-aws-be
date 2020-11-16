export const getEnv = (key: string): string => {
    const variable = process.env[key];
    console.assert(variable, `${key} is not provided`);

    return variable || null;
}
