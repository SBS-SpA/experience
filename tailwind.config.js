/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './pages/**/*.{js,jsx,ts,tsx}',
        './components/**/*.{js,jsx,ts,tsx}',
    ],
    theme: {
        extend: {
            height: {
                'half-screen': '50vh',
                'a-third-screen': '33.33vh',
            },
            gridTemplateRows: {
                '1-auto': '1fr auto',
            },
            spacing: {
                'a-third-screen': '33.33vh',
            },
            screens: {
                'tall': { 'raw': '(min-height: 700px)' },
                'medium': { 'raw': '(min-height: 600px)' },
            }
        },
    },
    plugins: [],
}
