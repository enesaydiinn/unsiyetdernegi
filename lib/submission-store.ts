type SubmissionKind = "support-application" | "donor-pledge";

type SubmissionPayload = Record<string, string | boolean>;

type PersistSubmissionInput = {
  kind: SubmissionKind;
  reference: string;
  payload: SubmissionPayload;
};

type WebhookPayload = PersistSubmissionInput & {
  submittedAt: string;
  source: "unsiyet-dernegi";
};

function webhookUrl() {
  return process.env.UNSIYET_FORM_WEBHOOK_URL?.trim();
}

export async function persistSubmission(input: PersistSubmissionInput) {
  const url = webhookUrl();

  if (!url) {
    console.info("[unsiyet-form-submission]", {
      ...input,
      submittedAt: new Date().toISOString(),
      storage: "log-only",
    });
    return;
  }

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...input,
      submittedAt: new Date().toISOString(),
      source: "unsiyet-dernegi",
    } satisfies WebhookPayload),
  });

  if (!response.ok) {
    throw new Error("Form kaydı geçici olarak alınamadı. Lütfen tekrar deneyin.");
  }
}
