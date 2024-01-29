export const dynamic = "force-dynamic";

export async function GET(request) {
  let base_url = process.env.BASE_URL;
  try {
    const res = await fetch(`${base_url}/api/users/logout`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Cookie: request.headers.get("cookie"),
      },
    });

    if (!res.ok) {
      const data = await res.json();
      throw new Error(data.message);
    }
    return new Response("signed out", {
      status: 200,
      headers: res.headers,
    });
  } catch (error) {
    console.error("Error processing form data:", error);
    return new Response(error, { status: 500 });
  }
}
