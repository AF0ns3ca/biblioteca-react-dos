import React, { useEffect } from 'react';

export default function SearchComponent() {
    useEffect(() => {
        const handleSearch = () => {
            const searchInput = document.getElementById("searchInput");
            const books = document.querySelectorAll(".card");
            const tableRows = document.querySelectorAll(".table-books table tbody tr");

            const searchTerm = searchInput.value.toLowerCase();

            // Iterar sobre cada libro y mostrar u ocultar según la búsqueda
            books.forEach(function (book) {
                const title = book.querySelector(".titulo").textContent.toLowerCase();
                const author = book.querySelector(".autor").textContent.toLowerCase();
                const serie = book.querySelector(".serie").textContent.toLowerCase();

                // Verificar si el título, autor o serie del libro coincide con el término de búsqueda
                if (
                    title.includes(searchTerm) ||
                    author.includes(searchTerm) ||
                    serie.includes(searchTerm)
                ) {
                    book.style.display = "block"; // Mostrar el libro
                } else {
                    book.style.display = "none"; // Ocultar el libro
                }
            });

            // Iterar sobre cada fila de la tabla y mostrar u ocultar según la búsqueda
            tableRows.forEach(function (row) {
                const rowData = row.textContent.toLowerCase();

                // Verificar si la fila contiene el término de búsqueda
                if (rowData.includes(searchTerm)) {
                    row.style.display = ""; // Mostrar la fila
                } else {
                    row.style.display = "none"; // Ocultar la fila
                }
            });
        };

        // Agregar un evento de entrada al campo de búsqueda
        const searchInput = document.getElementById("searchInput");
        if (searchInput) {
            searchInput.addEventListener("input", handleSearch);
        }

        // Eliminar el evento al desmontar el componente
        return () => {
            if (searchInput) {
                searchInput.removeEventListener("input", handleSearch);
            }
        };
    }, []);

    return null;
}
