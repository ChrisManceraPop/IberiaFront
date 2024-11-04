type AlertType = "warning" | "success" | "error" | "welcome"; // Define los tipos de alerta que necesitas

export interface AlertProps {
    title: string;
    subtitle: string;
    alertType: AlertType;
    onConfirm: () => void;
    onCancel?: () => void; // Opción de manejar acciones para el botón de cancelar
  }

export interface FacturaData {
    Total: string;
    TipoDeComprobante: string;
    MetodoPago: string;
    Emisor: {
      Rfc: string;
      Nombre: string;
      RegimenFiscal: string;
    };
    Receptor: {
      Rfc: string;
      Nombre: string;
      RegimenFiscal: string;
    };
    Complemento: {
      UUID: string;
      FechaTimbrado: string;
    };
  }

  export interface InputFilesProps {
    onDataLoaded: (data: FacturaData[]) => void;
  }