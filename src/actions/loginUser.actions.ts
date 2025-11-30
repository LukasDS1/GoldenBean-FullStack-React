import type { loginRequest, token } from "../interfaces/auth.interfaces";

export const loginUser = async (payload: loginRequest): Promise<token> => {
  const response = await fetch("http://localhost:8083/api-v1/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorMessage = await response.text();
    throw new Error(`Login error ${response.status}: ${errorMessage}`);
  }

  const data: token = await response.json();
  return data;
};
