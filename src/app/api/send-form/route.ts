// app/api/send-form/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    message: "GET request to /api/send-form working!",
  });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { mobile, name, trackingUrl, status, reason = "" } = body;

    const accessToken =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIxNGM4OTU5NS1jNGZlLTQwZWUtYWYwNy05ODVmYTVkMDUyODIiLCJ1bmlxdWVfbmFtZSI6ImVzdGVlbWZpbmFuY2U3QGdtYWlsLmNvbSIsIm5hbWVpZCI6ImVzdGVlbWZpbmFuY2U3QGdtYWlsLmNvbSIsImVtYWlsIjoiZXN0ZWVtZmluYW5jZTdAZ21haWwuY29tIiwiYXV0aF90aW1lIjoiMDQvMDMvMjAyNSAwNzo0NToxOSIsInRlbmFudF9pZCI6IjQyNTMyMiIsImRiX25hbWUiOiJtdC1wcm9kLVRlbmFudHMiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJBRE1JTklTVFJBVE9SIiwiZXhwIjoyNTM0MDIzMDA4MDAsImlzcyI6IkNsYXJlX0FJIiwiYXVkIjoiQ2xhcmVfQUkifQ.sfPB9WoIoxjNoqE5ku1TVmHgSSDnCn31xlFT5Vakvvc";

    const apiUrl = `https://live-mt-server.wati.io/425322/api/v1/sendTemplateMessage?whatsappNumber=${mobile}`;

    const data = {
      template_name:
        status === "Eligible" ? "sent_form" : "notekigible_with_reason",
      broadcast_name:
        status === "Eligible"
          ? "sent_form_040420251503"
          : "notekigible_with_reason_050420251233",
      parameters: [
        { name: "name", value: name || "" },
        status === "Eligible"
          ? {
              name: "tracking_url",
              value: trackingUrl || "",
            }
          : {
              name: "order_number",
              value: reason,
            },
      ],
    };
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    return NextResponse.json(result, { status: response.status });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
