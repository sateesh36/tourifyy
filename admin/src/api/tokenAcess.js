export const getAccessToken = () => {
  return localStorage.getItem("access_token");
};
export const removeAccessToken = () => {
  localStorage.removeItem("access_token");
};

export const getauthorizedRole = () => {
  return localStorage.getItem("role");
};
