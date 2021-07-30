export function handleResponse(response) {
  return (response && response.data && response.data.data) || {};
}
export function handleError(error) {
  let errorData = {};
  if (error.response) {
    const { status } = error.response;
    errorData = { ...error.response.data, status };
  } else if (error.request) {
    // The request was made but no response was received
    const { url = "", method = "" } = error.config || {};
    errorData = { errorCode: "client_error", url, method };
  } else {
    // Something happened in setting up the request that triggered an Error
    errorData = {
      message:
        error.message ||
        "Something happened in setting up the request that triggered an Error",
    };
  }
    return Promise.reject(errorData);
}
