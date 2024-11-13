import {defineConfig, loadEnv} from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), '')
    return {
      plugins: [react()],
      server: {
        host: true,
        // This configuration is only used for development
        // For production, we configure this in the nginx server
        proxy: {
          '/api': {
            target: env.VITE_BACKEND_URL,
            changeOrigin: true,
          },
        },
      },
      test: {
        env: loadEnv('test', process.cwd(), ''),
        environment: 'jsdom',
        globals: true,
        setupFiles: './src/setupTests.ts',
      }
    }
  }
)
