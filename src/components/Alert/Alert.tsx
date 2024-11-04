import Swal from "sweetalert2";
import lottie from "lottie-web";
import { AlertProps } from "../../utilis/interfaces";

const Alert = ({
  title,
  subtitle,
  alertType,
  onConfirm,
  onCancel,
}: AlertProps) => {
  let lottiePath: string;
  let showConfirmButton = true;
  let timer: number | undefined;

  switch (alertType) {
    case "warning":
      lottiePath =
        "https://eurocdn.azureedge.net/bucket/BackOffice/593warning.json";
      break;
    case "success":
      lottiePath =
        "https://eurocdn.azureedge.net/bucket/BackOffice/622success.json";
      break;
    case "error":
      lottiePath =
        "https://eurocdn.azureedge.net/bucket/BackOffice/478error.json";
      break;
    case "welcome":
      lottiePath =
        "https://lottie.host/4c90cfa5-1b7b-491a-b0ca-a210bc966e90/Bjm4fTxQT9.json";
      showConfirmButton = false; // No mostrar botón de confirmación para "welcome"
      timer = 4000; // Temporizador de 4 segundos
      break;
    default:
      lottiePath =
        "https://eurocdn.azureedge.net/bucket/BackOffice/780default.json";
      break;
  }

  Swal.fire({
    html: `
      <div style="display: flex; justify-content: center; align-items: center; flex-direction: column;">
        <div id="lottie-icon" style="height: 13rem;"></div>
        <h2 style="margin: 0; padding: 10px 0; font-size: 1.5rem;">${title}</h2>
        <p>${subtitle}</p>
      </div>
    `,
    allowOutsideClick: false,
    showConfirmButton: showConfirmButton,
    showCancelButton: alertType === "warning" || alertType === "error",
    confirmButtonText: "Aceptar", // Asegura que el texto del botón siempre sea "Aceptar"
    reverseButtons: true, // Invertir posición de los botones para que Aceptar esté a la derecha
    customClass: {
      popup: "custom-popup",
      confirmButton: "custom-confirm-button",
      cancelButton: "custom-cancel-button",
    },
    buttonsStyling: false, // Desactiva los estilos por defecto para aplicar los personalizados
    timer: timer,
    timerProgressBar: !!timer,
    willOpen: () => {
      // Aplicar los estilos personalizados cuando la alerta se abre
      const popup = Swal.getPopup();
      const confirmButton = Swal.getConfirmButton();
      const cancelButton = Swal.getCancelButton();
      //   const buttonContainer = popup?.querySelector(".swal2-actions");

      if (popup) {
        popup.style.borderRadius = "8px";
        popup.style.padding = "10px 20px 50px 20px";
        popup.style.width = "30rem";
        popup.style.boxShadow = "0px 4px 6px rgba(0, 0, 0, 0.1)";
      }

      if (confirmButton) {
        confirmButton.style.backgroundColor = "#1a2b5e";
        confirmButton.style.color = "white";
        confirmButton.style.border = "none";
        confirmButton.style.borderRadius = "5px";
        confirmButton.style.padding = "10px 20px";
        confirmButton.style.fontWeight = "bold";
        confirmButton.style.marginRight = "10px";
        confirmButton.style.marginRight = "10px";
      }

      if (cancelButton) {
        cancelButton.style.backgroundColor = "white";
        cancelButton.style.color = "#1a2b5e";
        cancelButton.style.border = "1px solid #1a2b5e";
        cancelButton.style.borderRadius = "5px";
        cancelButton.style.padding = "10px 20px";
        cancelButton.style.fontWeight = "bold";
        cancelButton.style.gap = "10px";
      }

      setTimeout(() => {
        lottie.loadAnimation({
          container: document.getElementById("lottie-icon") as Element,
          renderer: "svg",
          loop: true,
          autoplay: true,
          path: lottiePath,
        });
      }, 100);
    },
  }).then((result) => {
    if (result.isConfirmed) {
      onConfirm();
    } else if (result.dismiss === Swal.DismissReason.cancel && onCancel) {
      onCancel(); // Llamar a la función de cancelar si está definida
    }
  });
};

export default Alert;
