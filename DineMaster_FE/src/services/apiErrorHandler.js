export function handleApiError(error, customMessages = {}) {
  if (!error.response) {
    return "Network error, please check your connection.";
  }

  const status = error.response.status;

  // If customer message is provided for the status, it will be used instead of the default ones
  if (customMessages[status]) {
    return customMessages[status];
  }

  switch (status) {
    case 401:
      return "Authentication required. Please log in.";
    case 403:
      return "Access denied.";
    case 404:
      return "Resource not found.";
    case 409:
      return "Conflict occurred.";
    case 500:
      return "Server error occurred, please try again later.";
    default:
      return "An unexpected error occurred.";
  }
}
