async function getCookieData(request) {
  const cookieData = request.headers.get("cookie");
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve(cookieData);
    }, 100)
  );
}

export const dynamic = "force-dynamic";

export async function PUT(request, params) {
  let res;
  let base_url = process.env.BASE_URL;
  try {
    const formData = await request.json();
    const cookieData = await getCookieData(request);
    const id = params.params.id;

    res = await fetch(`${base_url}/api/transactions/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieData,
      },
      body: JSON.stringify(formData),
    });

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

export async function GET(request, params) {
  let res;
  let base_url = process.env.BASE_URL;
  try {
    const cookieData = await getCookieData(request);
    const id = params.params.id;

    res = await fetch(`${base_url}/api/transactions/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieData,
      },
    });

    if (!res.ok) {
      const data = await res.json();
      throw new Error(data.message);
    }
    const data = await res.json();
    const {
      amount,
      status,
      type,
      bankName,
      accountName,
      accountNumber,
      narration,
      dueDate,
      user,
      deposit
    } = data;

    const responseData = JSON.stringify({
      amount,
      status,
      type,
      dueDate,
      narration,
      bankName,
      accountName,
      accountNumber,
      user,
      deposit
    });

    return new Response(responseData, {
      status: 200,
      headers: res.headers,
    });
  } catch (error) {
    console.error("Error processing data:", error);
    return new Response(error, { status: 500, headers: res.headers });
  }
}
