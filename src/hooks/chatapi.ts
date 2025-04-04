import { Post } from "./apiUtils";

// export const sendForm = async (mobile, name, trackingUrl) => {
//   const accessToken = process.env.WATI_ACCESS_TOKEN; // Store token in .env file
//   const apiUrl = `https://live-mt-server.wati.io/425322/api/v1/sendTemplateMessage?whatsappNumber=${mobile}`;

//   const data = {
//     template_name: "sent_form",
//     broadcast_name: "sent_form_040420251503",
//     parameters: [
//       { name: "name", value: name || "" },
//       { name: "tracking_url", value: trackingUrl || "" },
//     ],
//   };
//   try {
//     await Post(apiUrl, data, 500, true).then((res: any) => {
//       return res;
//     });
//   } catch (error: any) {
//     console.log(error);
//   }
// };

export default async function sendForm(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { mobile, name, trackingUrl } = req.body;

  //   const accessToken = process.env.WATI_ACCESS_TOKEN; // Store token in .env file
  const accessToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIxNGM4OTU5NS1jNGZlLTQwZWUtYWYwNy05ODVmYTVkMDUyODIiLCJ1bmlxdWVfbmFtZSI6ImVzdGVlbWZpbmFuY2U3QGdtYWlsLmNvbSIsIm5hbWVpZCI6ImVzdGVlbWZpbmFuY2U3QGdtYWlsLmNvbSIsImVtYWlsIjoiZXN0ZWVtZmluYW5jZTdAZ21haWwuY29tIiwiYXV0aF90aW1lIjoiMDQvMDMvMjAyNSAwNzo0NToxOSIsInRlbmFudF9pZCI6IjQyNTMyMiIsImRiX25hbWUiOiJtdC1wcm9kLVRlbmFudHMiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJBRE1JTklTVFJBVE9SIiwiZXhwIjoyNTM0MDIzMDA4MDAsImlzcyI6IkNsYXJlX0FJIiwiYXVkIjoiQ2xhcmVfQUkifQ.sfPB9WoIoxjNoqE5ku1TVmHgSSDnCn31xlFT5Vakvvc";
  const apiUrl = `https://live-mt-server.wati.io/425322/api/v1/sendTemplateMessage?whatsappNumber=${mobile}`;

  const data = {
    template_name: "sent_form",
    broadcast_name: "sent_form_040420251503",
    parameters: [
      { name: "name", value: name || "" },
      { name: "tracking_url", value: trackingUrl || "" },
    ],
  };

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    return res.status(response.status).json(result);
  } catch (error) {
    return res
      .status(500)
      .json({ error: error.message || "Internal Server Error" });
  }
}
