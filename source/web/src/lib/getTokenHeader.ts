export function getTokenHeader() {
  const token = localStorage.getItem("token");
  if (!token) {
    return null;
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

export function parseJwt(token: string) {
  try {
    const [header, payload] = token.split(".").slice(0, 2);

    // Decodifica o header e o payload de Base64 para JSON
    const decodedHeader = JSON.parse(atob(header));
    const decodedPayload: { id: string; nome: string; email: string } = JSON.parse(atob(payload));

    return { header: decodedHeader, payload: decodedPayload };
  } catch (error) {
    console.error("Erro ao fazer o parse do JWT:", error);
    return null;
  }
}
