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
  
      const userId = params.params.userId;
      const cookieData = await getCookieData(request);
  
      res = await fetch(`${base_url}/api/transactions/total/${userId}/gain`, {
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
      const responseData = JSON.stringify({ value: data.amount });
  
      return new Response(responseData, {
        status: 200,
        headers: res.headers,
      });
    } catch (error) {
      console.error("Error processing data:", error);
      return new Response(error, { status: 500, headers: res.headers });
    }
  }
  