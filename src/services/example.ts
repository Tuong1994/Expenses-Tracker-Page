// const handleRefreshAndRetry = async (path: string, options: ApiRequestInit) => {
//   const refresh = localStorage.getItem("refresh_token");

//   if (!refresh) {
//     window.location.href = "/login";
//     return;
//   }

//   // gọi API refresh token
//   const refreshRes = await fetch(`${BASE_URL}/auth/refresh`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ refresh_token: refresh }),
//   });

//   if (!refreshRes.ok) {
//     localStorage.clear();
//     window.location.href = "/login";
//     return;
//   }

//   const data = await refreshRes.json();

//   // Lưu token mới
//   localStorage.setItem("access_token", data.access_token);

//   // Retry original request
//   return apiFetch(path, options);
// }


// Call api at server
// import { apiFetch } from "@/lib/apiClient";
// import { cookies } from "next/headers";

// export async function getUserServer() {
//   const token = cookies().get("access_token")?.value;

//   return apiFetch("/user/me", {
//     method: "GET",
//     token,   // attach token server-side
//   });
// }

// Call api at client
// 'use client';

// import { apiFetch } from "@/lib/apiClient";

// export default function Page() {
//   async function load() {
//     const data = await apiFetch("/user/me", {
//       auth: true, // tự add token từ localStorage
//     });

//     console.log(data);
//   }

//   return <button onClick={load}>Load user</button>;
// }