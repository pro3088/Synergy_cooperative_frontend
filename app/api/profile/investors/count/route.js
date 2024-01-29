async function getCookieData(request) {
  const cookieData = request.headers.get("cookie");
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve(cookieData);
    }, 100)
  );
}

export const dynamic = "force-dynamic";

export async function GET(request) {
  let res;
  let base_url = process.env.BASE_URL;

  const cookieData = await getCookieData(request);
  try {
    const status = "INVESTOR";
    res = await fetch(`${base_url}/api/profile/${status}/count`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieData,
      },
    });

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
