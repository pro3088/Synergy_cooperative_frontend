import CryptoJS from "crypto-js";
export const dynamic = "force-dynamic";

export async function POST(request) {
  let res;
  let base_url = process.env.BASE_URL
  try {
    const formData = await request.json();

    res = await fetch(`${base_url}/api/users/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData),
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(errorText);
    }

    const data = await res.json();
    const { id, firstName, lastName, emailAddress, status, dateJoined } = data;

    const encodedWord = CryptoJS.enc.Utf8.parse(id.toString());
    let encryptedId = CryptoJS.enc.Base64.stringify(encodedWord);

    const selectedData = { id, encryptedId, firstName, lastName, emailAddress, status, dateJoined };
    const responseData = JSON.stringify(selectedData);

    return new Response(responseData, {
      status: 200,
      headers: res.headers,
    });
  } catch (error) {
    return new Response(error, { status: res.status });
  }
}
