import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Box } from "@mui/material";
import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import Swal from "sweetalert2";
import "../css/login.css";

const Login: React.FC = () => {
  const images = [
    "https://eurocdn.azureedge.net/bucket/EBE/ib/120logo-Iberia.png",
    // "https://eurocdn.azureedge.net/bucket/BackOffice/a/a/distro.png"
  ];
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //states
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const isPasswordValid = password.trim();

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const handleLogin = () => {
    const isEmailValid = email.trim() && /\S+@\S+\.\S+/.test(email);
    if (!isEmailValid && !isPasswordValid) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Ingresa un correo electrónico válido y una contraseña valida",
      });
      setEmailError(true);
      setPasswordError(true);
      return;
    } else if (!isEmailValid) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Ingresa un correo electrónico válido",
      });
      setEmailError(true);
      return;
    } else if (!isPasswordValid) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No ingresaste contraseña valida",
      });
      setPasswordError(true);
      return;
    }
  };

  return (
    <>
      <Box className="row">
        <Box className="containerRight col-12 col-sm-12 col-md-6">
          <Box className="row login-container">
            <center>
              <p className=" fs-5 fw-bold">Bienvenido</p>
              <p className=" fs-5 fw-bold">Plataforma gestor de facturas</p>
            </center>
            <Box className="input-field col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
              <TextField
                className="input-field"
                label="Correo electrónico"
                variant="outlined"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setEmailError(false);
                }}
                margin="normal"
                error={emailError} // Cambia el borde del TextField si hay un error
                helperText={
                  emailError ? "No ingresaste correo electrónico valido" : ""
                }
              />
            </Box>
            <Box className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
              <TextField
                className="input-field"
                label="Contraseña"
                variant="outlined"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setPasswordError(false);
                }}
                margin="normal"
                error={passwordError}
                helperText={passwordError ? "No ingresaste contraseña" : ""}
                InputProps={{
                  // Utiliza íconos para mostrar y ocultar la contraseña
                  endAdornment: (
                    <Button onClick={togglePasswordVisibility}>
                      {showPassword ? (
                        <Visibility sx={{ color: "red" }} />
                      ) : (
                        <VisibilityOff sx={{ color: "black" }} />
                      )}
                    </Button>
                  ),
                }}
              />
            </Box>
            <Box className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
              <center style={{ marginTop: "1rem" }}>
                <button
                  type="button"
                  onClick={handleLogin}
                  className="btn btn-dark btn-lg"
                >
                  Iniciar sesión
                </button>
                <p className="fs-6 fw-bold" style={{ marginTop: "1rem" }}>
                  Olvide mi contraseña
                </p>
              </center>
            </Box>
          </Box>
        </Box>
        <Box className="containerleft col-12 col-sm-12 col-md-6">
          <Box
            id="carouselExampleSlidesOnly"
            className="carousel slide"
            data-bs-ride="carousel"
          >
            <Box className="carousel-inner">
              {images.map((image, index) => (
                <Box
                  key={index}
                  className={`carousel-item ${index === 0 ? "active" : ""}`}
                >
                  <img
                    src={image}
                    className="d-block w-100"
                    alt={`Slide ${index}`}
                  />
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Login;
