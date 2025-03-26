const errorResponse = (status, message, error = null) => {
    return {
      status,
      success: false,
      message,
      error,
    };
  };
  const successResponse = (status, message, result = null) => {
    return {
      status,
      success: true,
      message,
      result,
    };
  };
  module.exports = { successResponse, errorResponse };
  