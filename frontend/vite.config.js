// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  root: ".", // Explicitly setting the root
  plugins: [react()],
  build: {
    outDir: "dist", // Ensure the output is in 'dist'
  },
})
