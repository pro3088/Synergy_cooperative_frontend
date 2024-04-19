export const dynamic = "force-dynamic";

export async function PUT(request) {
  let res;
  let base_url = process.env.BASE_URL;
  try {

    const body = await request.json();
    console.log(body);

    res = await fetch(
      `${base_url}/api/users/reset/password`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body:  JSON.stringify(body),
      }
    );

    if (!res.ok) {
      throw new Error(res.message);
    }

    const data = await res.json();
    const responseData = JSON.stringify(data);

    return new Response(responseData, {
      status: 200,
      headers: res.headers,
    });
  } catch (error) {
    console.error("Error processing data:", error);
    return new Response(error, { status: 500, headers: res.headers });
  }
}
