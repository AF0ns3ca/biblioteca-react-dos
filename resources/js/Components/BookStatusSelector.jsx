import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import LocalLibraryOutlinedIcon from '@mui/icons-material/LocalLibraryOutlined';
import DoneAllOutlinedIcon from '@mui/icons-material/DoneAllOutlined';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';

const BookStatusSelector = ({ initialStatus, book, auth }) => {
    const [status, setStatus] = useState(initialStatus);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const handleStatusChange = (newStatus) => {
        setStatus(newStatus);
        console.log('Book ID:', book.id);
        console.log('New Status:', newStatus);

        if (newStatus === 'quiero_leer') {
            updateReadingStatus('quiero_leer', true, null, null);
        } else if (newStatus === 'leyendo') {
            const now = new Date();
            updateReadingStatus('leyendo', false, now, null);
        } else if (newStatus === 'leido') {
            const now = new Date();
            updateReadingStatus('leido', false, null, now);
        }
    };

    const updateReadingStatus = async (status, wantToRead, startDate, endDate) => {
        await Inertia.post('/update-reading-status', {
            book_id: book.id,
            status,
            want_to_read: wantToRead,
            start_date: startDate,
            end_date: endDate,
        });
    };

    const getStatusLabel = (status) => {
        if (status === 'quiero_leer') return{
            icon: <BookmarkBorderOutlinedIcon />,
        };
        if (status === 'leyendo') return {
            icon: <LocalLibraryOutlinedIcon />,
        };
        if (status === 'leido') return {
            icon: <DoneAllOutlinedIcon />,
        };
    };

    const bgColor = (auth.user.role =="user") ? "bg-metal" : "bg-premium";
    const bgHoverColor = (auth.user.role =="user") ? "bg-metaldark" : "bg-premiumdark";

    return (
        <div className="relative inline-block text-left">
            <div>
                <button
                    type="button"
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className={`inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 ${bgColor} text-sm font-medium text-white hover:${bgHoverColor} focus:outline-none`}
                    aria-expanded="true"
                    aria-haspopup="true"
                >
                    {/* Si estatus es quiero leer */}
                    {getStatusLabel(status).icon}
                    <KeyboardArrowDownOutlinedIcon/>
                </button>
            </div>

            {dropdownOpen && (
                <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                    <div className="py-1">
                        <button
                            onClick={() => { handleStatusChange('quiero_leer'); setDropdownOpen(false); }}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                        >
                            Quiero Leer
                        </button>
                        <button
                            onClick={() => { handleStatusChange('leyendo'); setDropdownOpen(false); }}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                        >
                            Leyendo
                        </button>
                        <button
                            onClick={() => { handleStatusChange('leido'); setDropdownOpen(false); }}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                        >
                            Leído
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BookStatusSelector;
