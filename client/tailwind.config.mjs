/** @type {import('tailwindcss').Config} */
const config = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            // here we add in custom colors which we gonna need for our project.
            // TO ALL -> you all can pick the name of color mentioned below from tailwindcss itself.
            colors: {
                'footer-bg': 'bg-[#0a1a2f]',  
                'button-bg':'bg-yellow-400',
                'main-bg':'bg-[#fcf6f1]',

            },
        },
    },
    plugins: [],
};
export default config;