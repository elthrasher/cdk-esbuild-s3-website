import { build, BuildOptions, BuildResult, serve, ServeResult } from 'esbuild';

const mode = process.argv[2];
const env = mode === 'build' ? 'production' : 'development';

const buildOptions: BuildOptions = {
  bundle: true,
  define: { 'process.env.NODE_ENV': `"${env}"` }, // must be double-quoted
  entryPoints: ['ui/index.tsx'],
  loader: { '.js': 'tsx' },
  logLevel: 'warning',
  outdir: 'website/js',
  sourcemap: true,
};

export const run = (mode: string): Promise<BuildResult | ServeResult> => {
  if (mode === 'build') {
    return build(buildOptions);
  }
  return serve({ servedir: 'website' }, buildOptions);
};

run(mode);
