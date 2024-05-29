import React from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

export default function BasicTab({ value, onChange, role, booksAuthorCount, booksSerieCount}) {
  const handleChange = (event, newValue) => {
    onChange(newValue);
  };

  const userColor = "#34495E";
  const adminColor = "#602F6B";
  const indicatorColor = "#3f51b5";
  const textColor = "#000";
  const selectedTextColor = indicatorColor;
  const hoverTextColor = indicatorColor;

  const bgColor = role === "user" ? userColor : adminColor;

  return (
    <div className="w-full items-center mb-5">
      <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          centered
          sx={{
            '& .MuiTabs-indicator': {
              backgroundColor: indicatorColor, // Color del indicador
            },
            '& .MuiTab-root': {
              color: textColor, // Color del texto de las pestañas no seleccionadas
              '&:hover': {
                color: hoverTextColor, // Color del texto al pasar el ratón por encima
              },
            },
            '& .Mui-selected': {
              color: selectedTextColor, // Color del texto de la pestaña seleccionada
            },
          }}
        >
          <Tab label="Información de lectura" />
          <Tab label={`Libros del mismo autor/a (${booksAuthorCount-1})`} />
          <Tab label={`Libros de la misma serie (${booksSerieCount-1})`} />
        </Tabs>
      </Box>
    </div>
  );
}
