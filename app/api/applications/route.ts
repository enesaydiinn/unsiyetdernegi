import { persistSubmission } from "@/lib/submission-store";

export const runtime = "nodejs";

const requiredFields = [
  "fullName",
  "phone",
  "email",
  "city",
  "ageRange",
  "weddingWindow",
  "monthlyIncome",
];

function clean(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function referenceCode(prefix: string) {
  return `${prefix}-${crypto.randomUUID().slice(0, 8).toUpperCase()}`;
}

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as Record<string, unknown>;
    const missing = requiredFields.filter((field) => !clean(payload[field]));
    const supportTypes = Array.isArray(payload.supportTypes)
      ? payload.supportTypes.map(clean).filter(Boolean)
      : [];

    if (missing.length > 0 || supportTypes.length === 0) {
      return Response.json(
        { error: "Lütfen zorunlu alanları doldurun." },
        { status: 400 }
      );
    }

    if (payload.contactPermission !== true) {
      return Response.json(
        { error: "İletişim izni olmadan başvuru alınamaz." },
        { status: 400 }
      );
    }

    const reference = referenceCode("UNS");
    await persistSubmission({
      kind: "support-application",
      reference,
      payload: {
        fullName: clean(payload.fullName),
        phone: clean(payload.phone),
        email: clean(payload.email),
        city: clean(payload.city),
        ageRange: clean(payload.ageRange),
        weddingWindow: clean(payload.weddingWindow),
        supportTypes: supportTypes.join(", "),
        monthlyIncome: clean(payload.monthlyIncome),
        notes: clean(payload.notes),
        contactPermission: true,
      },
    });

    return Response.json({ reference }, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Beklenmeyen hata";
    return Response.json({ error: message }, { status: 500 });
  }
}
