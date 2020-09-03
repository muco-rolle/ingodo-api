export const rootPath = process.cwd();
export const getEnv = (): string | 'development' | 'production' | 'test' | 'staging' => process.env['NODE_ENV'];
