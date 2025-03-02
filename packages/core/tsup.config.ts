import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  dts: true,
  splitting: true,
  sourcemap: true,
  clean: true,
  treeshake: true,
  external: ['react', 'react-dom'],
  async onSuccess() {
    const { execa } = await import('execa');
    await execa('postcss', ['src/tailwind.css', '-o', 'dist/tailwind.css']);
  },
});
