import React, { useEffect } from "react";

export default function SearchComponent() {
    useEffect(() => {
        const handleSearch = () => {
            const searchInput = document.getElementById("searchInput");
            const books = document.querySelectorAll(".card");
            const tableRows = document.querySelectorAll(
                ".table-books table tbody tr"
            );

            const searchTerm = searchInput.value.toLowerCase();

            // Verificamos si el campo de búsqueda está vacío
            if (searchTerm === "") {
                // Restablecemos la visibilidad de todos los libros y filas de la tabla
                books.forEach((book) => {
                    book.style.display = ""; // Mostramos todos los libros
                });
                tableRows.forEach((row) => {
                    row.style.display = ""; // Mostramos todas las filas
                });
            } else {
                // Procesamos la búsqueda solo si hay un término para buscar
                books.forEach(function (book) {
                    const titleElement = book.querySelector(".titulo");
                    const authorElement = book.querySelector(".autor");
                    const serieElement = book.querySelector(".serie");

                    const title = titleElement
                        ? titleElement.textContent.toLowerCase()
                        : "";
                    const author = authorElement
                        ? authorElement.textContent.toLowerCase()
                        : "";
                    const serie = serieElement
                        ? serieElement.textContent.toLowerCase()
                        : "";

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
                        row.style.display = ""; // Mostramos la fila
                    } else {
                        row.style.display = "none"; // Ocultamos la fila
                    }
                });
            }
        };

        // Agregamos un evento de entrada al campo de búsqueda
        const searchInput = document.getElementById("searchInput");
        if (searchInput) {
            searchInput.addEventListener("input", handleSearch);
        }

        // Eliminamos el evento al desmontar el componente
        return () => {
            if (searchInput) {
                searchInput.removeEventListener("input", handleSearch);
            }
        };
    }, []);

    return (
        <input
            type="text"
            placeholder="Buscar libros..."
            id="searchInput"
            className="w-full px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:border-gray-700 focus:ring-metaldark"
        />
    );
}
