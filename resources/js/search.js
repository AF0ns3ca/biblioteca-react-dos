// Obtener el campo de entrada y la lista de libros
const searchInput = document.getElementById("searchInput");
const books = document.querySelectorAll(".card");
// Obtener el campo de entrada y las filas de la tabla
const tableRows = document.querySelectorAll(".table-books table tbody tr");

// Agregar un evento de entrada al campo de búsqueda
searchInput.addEventListener("input", function () {
    const searchTerm = searchInput.value.toLowerCase();

    // Iterar sobre cada libro y mostrar u ocultar según la búsqueda
    books.forEach(function (book) {
        const title = book.querySelector("h2").textContent.toLowerCase();
        const author = book
            .querySelector(".card-body p:nth-of-type(1)")
            .textContent.toLowerCase();
        const serie = book
            .querySelector(".card-body p:nth-of-type(2)")
            .textContent.toLowerCase();

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

    tableRows.forEach(function (row) {
        const rowData = row.textContent.toLowerCase();

        // Verificar si la fila contiene el término de búsqueda
        if (rowData.includes(searchTerm)) {
            row.style.display = ""; // Mostrar la fila
        } else {
            row.style.display = "none"; // Ocultar la fila
        }
    });
});
