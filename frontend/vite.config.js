import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
})
// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react' // or whatever framework you're using

// export default defineConfig({
//   plugins: [react()],
//   root: './', // Ensure this points to the directory containing your index.html
// })