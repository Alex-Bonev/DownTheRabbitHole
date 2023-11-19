/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        "primary": "var(--primary)",
        "secondary": "var(--secondary)",
        "offwhite": "var(--offwhite)",
        "background": "var(--background)",
        "text": "var(--text)",
        // #004ba8
      },
    },
  },
  plugins: [],
}

