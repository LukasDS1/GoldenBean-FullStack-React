import type { RegisterRequest, RegisterResponse } from "../interfaces/auth.interfaces";

export const registerUser = async (
  payload: RegisterRequest
): Promise<RegisterResponse> => {
  const response = await fetch("http://localhost:8082/api-v1/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(`HTTP error: ${response.status}`);
  }

  const data: RegisterResponse = await response.json();
  return data;
};
