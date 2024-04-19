export const dynamic = "force-dynamic";

export async function GET(request, params) {
  let res;
  let base_url = process.env.BASE_URL;
  const email = params.params.email;
  const queryString = request.url.split("?")[1];
  const searchParams = new URLSearchParams(queryString);
  const origin = searchParams.get("origin");
  try {
    res = await fetch(`${base_url}/api/users/reset/${email}?origin=${origin}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      console.log(res);
      throw new Error(res.message);
    }

    return new Response({
      status: 200,
      headers: res.headers,
    });
  } catch (error) {
    console.error("Error processing data:", error);
    return new Response(error, { status: 500, headers: res.headers });
  }
}
