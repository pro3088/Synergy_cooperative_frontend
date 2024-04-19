async function getCookieData(request) {
  const cookieData = request.headers.get("cookie");
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve(cookieData);
    }, 100)
  );
}

export const dynamic = "force-dynamic";

export async function GET(request, params) {
  let res;
  let base_url = process.env.BASE_URL;
  let ff;
  try {
    const queryString = request.url.split("?")[1];
    const searchParams = new URLSearchParams(queryString);
    const userId = params.params.userId;
    const limit = searchParams.get("limit");
    const offset = searchParams.get("offset");
    const pageSize = searchParams.get("pageSize");

    const cookieData = await getCookieData(request);

    res = await fetch(
      `${base_url}/api/transactions/${userId}/applications?limit=${limit}&offset=${offset}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieData,
        },
      }
    );

    if (!res.ok) {
      const data = await res.json();
      throw new Error(data.message);
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
