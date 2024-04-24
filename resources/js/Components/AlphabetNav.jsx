import React, { useState } from "react";

function AlphabetNav({ selectedLetter, setSelectedLetter }) {
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
    const [searchField, setSearchField] = useState("titulo"); // Estado para controlar el campo de búsqueda

    // Función para determinar si el título comienza con un número o carácter especial
    const handleSpecialCharacters = () => {
        setSelectedLetter({
            letter: 'special',
            field: searchField
        });
    };

    return (
        <div className="w-full flex items-center justify-center">
            <div className=" fixed top-16 w-full h-auto flex flex-row justify-center items-center p-3 gap-5 bg-metallight">
                <div className="w-[90px] flex justify-center items-center">
                    <select
                        value={searchField}
                        onChange={(e) => setSearchField(e.target.value)}
                        className="w-full text-sm py-2 px-3 rounded bg-white border border-gray-400 hover:border-gray-500"
                    >
                        <option value="titulo">Título</option>
                        <option value="autor">Autor</option>
                        <option value="serie">Serie</option>
                    </select>
                </div>
                <div className="flex justify-center space-x-2">
                    <button
                        onClick={handleSpecialCharacters}
                        className={`max-h-[36px] text-sm py-2 px-3 rounded hover:bg-metal hover:text-white ${
                            selectedLetter.letter === 'special' &&
                            selectedLetter.field === searchField
                                ? "bg-metal text-white"
                                : "bg-gray-200"
                        }`}
                    >
                        # / 0-9
                    </button>
                    {alphabet.map((letter) => (
                        <button
                            key={letter}
                            onClick={() =>
                                setSelectedLetter({
                                    letter,
                                    field: searchField,
                                })
                            }
                            className={`text-sm py-2 px-3 rounded hover:bg-metal hover:text-white ${
                                selectedLetter.letter === letter &&
                                selectedLetter.field === searchField
                                    ? "bg-metal text-white"
                                    : "bg-gray-200"
                            }`}
                        >
                            {letter}
                        </button>
                    ))}
                    <button
                        onClick={() =>
                            setSelectedLetter({ letter: "", field: "" })
                        }
                        className="text-sm py-2 px-3 rounded bg-gray-200 hover:bg-gray-500 hover:text-white"
                    >
                        Reset
                    </button>
                </div>
            </div>
        </div>
    );
}

export default AlphabetNav;
