const adsenseClient = process.env.NEXT_PUBLIC_ADSENSE_CLIENT ?? "";
const publisherId = /^ca-pub-\d{16}$/.test(adsenseClient) ? adsenseClient.replace("ca-", "") : "";

export function GET() {
  const body = publisherId
    ? `google.com, ${publisherId}, DIRECT, f08c47fec0942fa0\n`
    : "# Advertising is not enabled on this site.\n";

  return new Response(body, {
    headers: {
      "Cache-Control": "no-store",
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}
