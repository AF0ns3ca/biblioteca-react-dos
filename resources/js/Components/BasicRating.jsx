import React, { useState, useEffect } from "react";
import { Inertia } from "@inertiajs/inertia";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";

export default function BasicRating({ book, initialRating, size }) {
    // Asegúrate de que initialRating sea un número
    const initialRatingNumber = parseFloat(initialRating) || 0;
    const [value, setValue] = useState(initialRatingNumber);

    const handleRatingChange = async (event, newValue) => {
        console.log(
            "Al libro " + book.titulo + " le diste " + newValue + " estrellas"
        );
        setValue(newValue);

        if (newValue === null) {
            // Llamar al endpoint para eliminar la calificación
            await Inertia.delete(`/rate/destroy/${book.id}`, {
                preserveScroll: true,
                preserveState: true,
                onSuccess: () => {
                    Inertia.reload({ only: ["rate"] });
                    console.log("Rating removed successfully");
                },
            });
        } else {
            // Lógica para crear o actualizar la calificación
            const endpoint =
                initialRating === null ? "/rate/store" : `/rate/update/${book.id}`;
            const data = { rate: newValue, book_id: book.id };

            if (initialRating === null) {
                await Inertia.post(endpoint, data, {
                    preserveScroll: true,
                    preserveState: true,
                    onSuccess: () => {
                        Inertia.reload({ only: ["rate"] });
                        console.log("Rating processed successfully");
                    },
                });
            } else {
                await Inertia.put(endpoint, data, {
                    preserveScroll: true,
                    preserveState: true,
                    onSuccess: () => {
                        Inertia.reload({ only: ["rate"] });
                        console.log("Rating updated successfully");
                    },
                });
            }
        }
    };

    // Efecto para actualizar la calificación si el initialRating cambia
    useEffect(() => {
        setValue(parseFloat(initialRating) || 0);
    }, [initialRating]);

    return (
        <Box sx={{ "& > legend": { mt: 2 } }}>
            <Rating
                name="half-rating"
                value={value}
                precision={0.5}
                onChange={handleRatingChange}
                size={size}
            />
        </Box>
    );
}
