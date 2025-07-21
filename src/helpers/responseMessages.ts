export const responseMessages = {
  SUCCESSFUL: {
    codigo: "0",
    mensaje: "Operación exitosa.",
    status: 200
  },
  JWT_ERROR: {
    codigo: "-3",
    mensaje: "No se puede obtener el token.",
    status: 401
  },
  EXPIRED_JWT: {
    codigo: "-4",
    mensaje: "El token ha expirado.",
    status: 401
  },
  KEYS_ERROR: {
    codigo: "-12",
    mensaje: "Ocurrió un problema al obtener las llaves.",
    status: 400
  },
  VALIDATION_ERROR: {
    codigo: "-20",
    mensaje: "Error de validación en los datos proporcionados.",
    status: 400
  },
  ERROR_OCURRED: {
    codigo: "-120",
    mensaje: "Ocurrió un problema",
    status: 500
  }
};
