import React from 'react';

export default function ChangeButton({ setView, view }) {
    // Función para cambiar entre vistas
    const handleChangeView = () => {
        setView(prevView => (prevView === 'cards' ? 'table' : 'cards'));
    };

    return (
        <div>
            <button className='bg-metal text-white w-20 py-3 rounded-full' onClick={handleChangeView}>{view === 'cards' ? 'Table' : 'Cards'}</button>
        </div>
    );
}
