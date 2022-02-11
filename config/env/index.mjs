const env = (process.env.NODE_ENV || 'development') + '.mjss';
const config = await import(`./${env}`);

export default config;