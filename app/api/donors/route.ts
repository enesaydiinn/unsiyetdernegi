import { getDb } from "@/db";
import { donorPledges } from "@/db/schema";

const requiredFields = [
  "donorType",
  "fullName",
  "phone",
  "email",
  "city",
  "supportChannel",
  "amountRange",
  "frequency",
];

function clean(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function referenceCode(prefix: string) {
  return `${prefix}-${crypto.randomUUID().slice(0, 8).toUpperCase()}`;
}

function errorMessage(error: unknown) {
  const message = error instanceof Error ? error.message : "Beklenmeyen hata";
  if (message.includes("no such table")) {
    return "Bağışçı kayıt veritabanı henüz hazırlanmadı. Yayın akışında migrasyonlar uygulanınca form kayıtları aktifleşir.";
  }
  return message;
}

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as Record<string, unknown>;
    const missing = requiredFields.filter((field) => !clean(payload[field]));

    if (missing.length > 0) {
      return Response.json(
        { error: "Lütfen zorunlu alanları doldurun." },
        { status: 400 }
      );
    }

    if (payload.contactPermission !== true) {
      return Response.json(
        { error: "İletişim izni olmadan bağışçı kaydı alınamaz." },
        { status: 400 }
      );
    }

    const reference = referenceCode("BGS");
    const db = getDb();

    await db.insert(donorPledges).values({
      id: crypto.randomUUID(),
      referenceCode: reference,
      donorType: clean(payload.donorType),
      fullName: clean(payload.fullName),
      phone: clean(payload.phone),
      email: clean(payload.email),
      city: clean(payload.city),
      supportChannel: clean(payload.supportChannel),
      amountRange: clean(payload.amountRange),
      frequency: clean(payload.frequency),
      message: clean(payload.message),
      contactPermission: true,
    });

    return Response.json({ reference }, { status: 201 });
  } catch (error) {
    return Response.json({ error: errorMessage(error) }, { status: 500 });
  }
}
