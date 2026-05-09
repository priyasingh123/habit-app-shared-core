const baseUrl = process.env.EXPO_PUBLIC_API_URL ?? "http://localhost:8081";

export const restApiRequest = async (
  endpoint: string,
  options: RequestInit = {},
) => {
  const url = `${baseUrl}${endpoint}`;

  try {
    const res = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        ...(options?.headers || {}),
      },
      ...options,
    });
    if (!res.ok) {
      const errorData = await res.json();
      const message =
        errorData?.message ||
        errorData?.error ||
        `Request failed with status ${res.status}`;
      throw new Error(message);
    }
    return res.json();
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error("API request error:", err.message);
    } else {
      console.error("API request error:", err);
    }
    throw err;
  }
};
