export function getTokenHeader() {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("Token not found in localStorage");
  }
  return {
    options: {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    },
  };
}
