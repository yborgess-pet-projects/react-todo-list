import {defineConfig, loadEnv} from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({mode}) => {
        // eslint-disable-next-line no-undef
        const env = loadEnv(mode, process.cwd(), '')
        return {
            plugins: [react()],
            server: {
                host: true,
                // This configuration is only used for development
                proxy: {
                    '/api': {
                        target: env.VITE_BACKEND_URL,
                        changeOrigin: true,
                    },
                },
            },
        }
    }
)
