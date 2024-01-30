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
      throw new Error("Failed to fetch data");
    }

    const data = await res.json();
    console.log("data: ",data)
    const { id, firstName, lastName, emailAddress, status } = data;
    const selectedData = { id, firstName, lastName, emailAddress, status };
    console.log("selected data: ", selectedData)
    const responseData = JSON.stringify(selectedData);

    return new Response(responseData, {
      status: 200,
      headers: res.headers,
    });
  } catch (error) {
    console.error("Error processing form data:", error);
    return new Response(error, { status: 500, headers: res.headers });
  }
}
