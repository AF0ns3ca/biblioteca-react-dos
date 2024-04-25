import React, { useEffect } from 'react';

export default function SearchComponent() {
    useEffect(() => {
        const handleSearch = () => {
            const searchInput = document.getElementById("searchInput");
            const books = document.querySelectorAll(".card");
            const tableRows = document.querySelectorAll(".table-books table tbody tr");

            const searchTerm = searchInput.value.toLowerCase();

            // Verificar si el campo de búsqueda está vacío
            if (searchTerm === "") {
                // Restablecer la visibilidad de todos los libros y filas de la tabla
                books.forEach(book => {
                    book.style.display = ""; // Mostrar todos los libros
                });
                tableRows.forEach(row => {
                    row.style.display = ""; // Mostrar todas las filas
                });
            } else {
                // Procesar la búsqueda solo si hay un término para buscar
                books.forEach(function (book) {
                    const titleElement = book.querySelector(".titulo");
                    const authorElement = book.querySelector(".autor");
                    const serieElement = book.querySelector(".serie");

                    const title = titleElement ? titleElement.textContent.toLowerCase() : "";
                    const author = authorElement ? authorElement.textContent.toLowerCase() : "";
                    const serie = serieElement ? serieElement.textContent.toLowerCase() : "";

                    if (
                        title.includes(searchTerm) ||
                        author.includes(searchTerm) ||
                        serie.includes(searchTerm)
                    ) {
                        book.style.display = "block";
                    } else {
                        book.style.display = "none";
                    }
                });

                tableRows.forEach(function (row) {
                    const rowData = row.textContent.toLowerCase();
                    if (rowData.includes(searchTerm)) {
                        row.style.display = ""; // Mostrar la fila
                    } else {
                        row.style.display = "none"; // Ocultar la fila
                    }
                });
            }
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
