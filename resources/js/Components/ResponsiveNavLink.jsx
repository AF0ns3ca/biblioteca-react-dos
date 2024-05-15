import { Link } from '@inertiajs/react';

export default function ResponsiveNavLink({ active = false, className = '', children, ...props }) {
    return (
        <Link
            {...props}
            className={`w-full flex items-start ps-3 pe-4 py-2 border-l-4 text-white ${
                active
                    ? ''
                    : 'border-transparent text-gray-600 hover:text-metal hover:bg-gray-50 hover:border-gray-300 focus:text-metal focus:bg-gray-50 focus:border-metal'
            } text-base font-medium focus:outline-none transition duration-150 ease-in-out ${className}`}
        >
            {children}
        </Link>
    );
}
