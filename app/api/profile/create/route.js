export const dynamic = "force-dynamic";

export async function POST(request) {
  let res;
  let base_url = process.env.BASE_URL
  try {
    const formData = await request.json();
    console.log(base_url);

    res = await fetch(`${base_url}/api/users/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData),
    });

    console.log(res)

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    const data = await res.json();
    const { id, firstName, lastName, emailAddress, status } = data;
    const selectedData = { id, firstName, lastName, emailAddress, status };
    const responseData = JSON.stringify(selectedData);

    return new Response(responseData, {
      status: 200,
      headers: res.headers,
    });
  } catch (error) {
    console.error("Error processing form data:", error);
    console.log(res)
    return new Response(error, { status: 500, headers: res.headers });
  }
}
