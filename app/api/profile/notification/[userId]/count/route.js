import CryptoJS from "crypto-js";

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
  try {
    const encryptedId = params.params.userId;
    const cookieData = await getCookieData(request);

    const encodedWord = CryptoJS.enc.Base64.parse(encryptedId);
    const userId = CryptoJS.enc.Utf8.stringify(encodedWord);

    res = await fetch(`${base_url}/api/notification/${userId}/count`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieData,
      },
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(errorText);
    }

    const textData = await res.text();
    const count = parseInt(textData, 10);

    if (isNaN(count)) {
      throw new Error("The response is not a valid number");
    }

    return new Response(count, {
      status: 200,
      headers: res.headers,
    });
  } catch (error) {
    return new Response(error, { status: res.status });
  }
}
