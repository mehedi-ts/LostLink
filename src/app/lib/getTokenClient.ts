import { authClient } from "./auth-client";


export async function getTokenClient() {
  const { data } = await authClient.token();

  if (!data) {
    throw new Error("No token data returned from authClient");
  }

  return data.token;
}
