import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Figtree', ...defaultTheme.fontFamily.sans],
            },
            colors: {
                'metal': '#34495E',
                'metaldark': '#2C3E50',
                'metallight': '#5D6D7E',
                'turquesa': '#1ABC9C',
                'turquesadark': '#16A085',
                'turquesalight': '#48C9B0',
                'honey': '#F1C40F',
            },
            screens:{
                'lgxl': '1500px',
            }
        },
    },

    plugins: [forms],
};
