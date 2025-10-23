export async function fetchRefreshToken(cookie?: string) {
  try {
    const API = process.env.NEXT_PUBLIC_API_URL as string;
    const res = await fetch(`${API}/auth/refresh`, {
      method: "POST",
      credentials: "include",
      headers: cookie ? { cookie } : undefined,
    });

    if (!res.ok) return null;

    return (await res.json()) as {
      token: string;
      refreshToken: string;
    };
  } catch (_) {
    return null;
  }
}
