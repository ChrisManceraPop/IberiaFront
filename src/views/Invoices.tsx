import React, { useState } from "react";
import InputFiles from "../components/InputFile/InputFiles";
import { FacturaData } from "../utilis/interfaces";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { Box, Container, Typography } from "@mui/material";

const Invoices: React.FC = () => {
  const [dataFacturas, setDataFacturas] = useState<FacturaData[]>([]);

  const columnDefs = [
    { headerName: "Total", field: "Total" },
    { headerName: "Tipo de Comprobante", field: "TipoDeComprobante" },
    { headerName: "Método de Pago", field: "MetodoPago" },
    { headerName: "RFC Emisor", field: "RfcEmisor" },
    { headerName: "Nombre Emisor", field: "NombreEmisor" },
    { headerName: "Régimen Fiscal Emisor", field: "RegimenFiscalEmisor" },
    { headerName: "RFC Receptor", field: "RfcReceptor" },
    { headerName: "Nombre Receptor", field: "NombreReceptor" },
    { headerName: "Régimen Fiscal Receptor", field: "RegimenFiscalReceptor" },
    { headerName: "UUID", field: "UUID" },
    { headerName: "Fecha Timbrado", field: "FechaTimbrado" },
    { headerName: "URL XML", field: "URLXML" },
  ];

  return (
    <Container style={{ width: "100vh" }}>
      {dataFacturas.length === 0 ? (
        <InputFiles onDataLoaded={setDataFacturas} />
      ) : (
        <Box className="ag-theme-alpine">
          <Typography
            variant="h6"
            align="center"
            gutterBottom
            sx={{ marginTop: "1rem", marginBottom: "1rem" }}
          >
            Facturas ingresadas
          </Typography>
          <AgGridReact
            columnDefs={columnDefs}
            rowData={dataFacturas}
            domLayout="autoHeight"
          />
        </Box>
      )}
    </Container>
  );
};

export default Invoices;
