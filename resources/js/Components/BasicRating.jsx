import React, { useState } from "react";
import { Inertia } from "@inertiajs/inertia";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import Stack from '@mui/material/Stack';

export default function BasicRating({ book, initialRating }) {
    const [value, setValue] = useState(initialRating || 0);

    const handleRatingChange = (event, newValue) => {
        console.log(
            "Al libro " + book.titulo + " le diste " + newValue + " estrellas"
        );
        setValue(newValue);

        if (newValue === null) {
            // Llamar al endpoint para eliminar la calificación
            Inertia.delete(`/rate/destroy/${book.id}`, {
                preserveScroll: true,
                preserveState: true,
                onSuccess: () => {
                    Inertia.reload({ only: ["rate"] });
                    console.log("Rating removed successfully");
                },
            });
        } else if (newValue != null) {
            // Lógica para crear o actualizar la calificación
            const endpoint =
                initialRating === null ? "/rate/store" : "/rate/update";
            const data = { rate: newValue, book_id: book.id };

            if (initialRating === null) {
                Inertia.post(endpoint, data, {
                    preserveScroll: true,
                    preserveState: true,
                    onSuccess: () => {
                        Inertia.reload({ only: ["rate"] });
                        console.log("Rating processed successfully");
                    },
                });
            } else {
                Inertia.put(endpoint, data, {
                    preserveScroll: true,
                    preserveState: true,
                    onSuccess: () => {
                        Inertia.reload({ only: ["rate"] });
                        console.log("Rating updated successfully");
                    },
                });
            }
        }

        // Efecto para actualizar la calificación si los props cambian
        useEffect(() => {
            if (props.rate) {
                setRate(props.rate);
            }
        }, [props.rate]);
    };

    return (
        <Box sx={{ "& > legend": { mt: 2 } }}>
            <Rating
                name="half-rating"
                defaultValue={0}
                value={value}
                precision={0.5}
                size="large"
                onChange={handleRatingChange}
            />
        </Box>
    );
}
