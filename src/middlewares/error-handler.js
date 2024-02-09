import { CustomError } from "../errors/custom-errors";

export const errorHandler = (error, req, res, next) => {
  const isErrorSafeForClient = error instanceof CustomError;

  if (!isErrorSafeForClient) console.log(error);

  const clientError = isErrorSafeForClient
    ? { message: error.message, code: error.code, status: error.status, data: error.data }
    : {
        message: "Something went wrong, please contact our support.",
        code: "INTERNAL_ERROR",
        status: 500,
        data: {},
      };

  res.status(clientError.status).json({ error: clientError });
};
