import React, { useState } from "react";
import { Button, Typography, Container, Box } from "@mui/material";
import Alert from "../Alert/Alert";
import axios from "axios";
import { FacturaData, InputFilesProps } from "../../utilis/interfaces";

const apiUploadFile =
  "https://eurogeneralfilerepo.azurewebsites.net/File/uploadFile"; // Cambia esto por la URL de tu API

const InputFiles: React.FC<InputFilesProps> = ({ onDataLoaded }) => {
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  const uploadProofOfPayment = async (file: File): Promise<string | null> => {
    const formData = new FormData();
    formData.append("File", file);
    formData.append("ProyectName", "5");
    formData.append("SetPrefixMiliSec", "true");
    formData.append("NameFile", "0000");
    formData.append("SubNivel1", "xml");
    formData.append("SubNivel2", "ERS");
    try {
      const response = await axios.post<string>(apiUploadFile, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      Alert({
        title: "Error",
        subtitle: "No se pudo guardar el archivo.",
        alertType: "error",
        onConfirm: () => console.log("Error en subida"),
      });
      return null;
    }
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const selectedFiles = Array.from(event.target.files || []);
    const xmlFiles = selectedFiles.filter((file) => file.type === "text/xml");

    if (xmlFiles.length === 0) {
      Alert({
        title: "Error",
        subtitle: "Por favor, selecciona al menos un archivo XML.",
        alertType: "error",
        onConfirm: () => console.log("Error confirmado"),
      });
      return;
    }

    const parsedData: FacturaData[] = [];
    for (const file of xmlFiles) {
      const fileText = await file.text();
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(fileText, "application/xml");

      const fileUrl = await uploadProofOfPayment(file);
      if (!fileUrl) continue;

      const comprobante = xmlDoc.getElementsByTagName("cfdi:Comprobante")[0];
      const emisor = xmlDoc.getElementsByTagName("cfdi:Emisor")[0];
      const receptor = xmlDoc.getElementsByTagName("cfdi:Receptor")[0];
      const complemento = xmlDoc.getElementsByTagName(
        "tfd:TimbreFiscalDigital"
      )[0];

      const factura: FacturaData = {
        Total: parseFloat(comprobante.getAttribute("Total") || "0") || null,
        TipoDeComprobante:
          comprobante.getAttribute("TipoDeComprobante") || null,
        MetodoPago: comprobante.getAttribute("MetodoPago") || null,
        RfcEmisor: emisor.getAttribute("Rfc") || null,
        NombreEmisor: emisor.getAttribute("Nombre") || "",
        RegimenFiscalEmisor: emisor.getAttribute("RegimenFiscal") || null,
        RfcReceptor: receptor.getAttribute("Rfc") || "",
        NombreReceptor: receptor.getAttribute("Nombre") || null,
        RegimenFiscalReceptor:
          receptor.getAttribute("RegimenFiscalReceptor") || null,
        UUID: complemento.getAttribute("UUID") || "",
        FechaTimbrado: complemento.getAttribute("FechaTimbrado")
          ? new Date(complemento.getAttribute("FechaTimbrado") || "")
          : null,
        URLXML: fileUrl,
      };

      parsedData.push(factura);
    }

    setIsDataLoaded(true);
    onDataLoaded(parsedData);

    Alert({
      title: "Archivos Procesados",
      subtitle: `Se procesaron ${xmlFiles.length} archivos XML correctamente.`,
      alertType: "success",
      onConfirm: () => console.log("Archivos procesados correctamente"),
    });
  };

  return (
    <Container maxWidth="md">
      {!isDataLoaded && (
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          marginTop={4}
        >
          <Typography variant="h6" align="center" gutterBottom>
            Selecciona las facturas a procesar, solo archivos XML
          </Typography>
          <input
            accept=".xml"
            style={{ display: "none" }}
            id="file-upload"
            multiple
            type="file"
            onChange={handleFileChange}
          />
          <label htmlFor="file-upload" style={{ width: "100%" }}>
            <Button variant="contained" component="span" fullWidth>
              Seleccionar facturas
            </Button>
          </label>
        </Box>
      )}
    </Container>
  );
};

export default InputFiles;
