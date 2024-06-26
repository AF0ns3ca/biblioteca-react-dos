import React from 'react';

export default function AddButton({ onClick, color, ...props }) {
    const handleClick = (e) => {
        e.preventDefault(); 
        onClick();
    };

    return (
        <button onClick={handleClick} className={`${color} text-white px-4 py-4 rounded-full`}>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
            </svg>
        </button>
    );
};
