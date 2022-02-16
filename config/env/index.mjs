const env = (process.env.NODE_ENV || 'development') + '.mjs';
const config = await import(`./${env}`);

export default config;