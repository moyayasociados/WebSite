export async function GET() {
  return Response.json({ ok: true, service: "moya-asociados-web", timestamp: new Date().toISOString() });
}
