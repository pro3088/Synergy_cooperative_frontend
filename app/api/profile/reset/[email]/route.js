export const dynamic = "force-dynamic";

export async function PUT(params) {
  let res;
  let base_url = process.env.BASE_URL
  try {
    const email = params.params.email;

    res = await fetch(`${base_url}/api/users/mail/reset/${email}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(errorText);
    }

    return new Response({
      status: 200,
      headers: res.headers,
    });
  } catch (error) {
    return new Response(error, { status: res.status });
  }
}
