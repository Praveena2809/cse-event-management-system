import PDFDocument from "pdfkit";
import QRCode from "qrcode";

/**
 * Beginner-friendly certificate generator.
 * Returns a Buffer containing the PDF file.
 */
export const generateCertificatePdfBuffer = async ({
  participantName,
  eventName,
  subeventName,
  certificateType,
  position,
  dateText,
  verificationUrl,
}) => {
  const doc = new PDFDocument({ size: "A4", margin: 50 });

  const chunks = [];
  doc.on("data", (c) => chunks.push(c));

  // Border
  doc
    .rect(20, 20, doc.page.width - 40, doc.page.height - 40)
    .lineWidth(2)
    .stroke("#0f172a");

  doc.fontSize(26).fillColor("#0f172a").text("CERTIFICATE", { align: "center" });
  doc.moveDown(0.5);

  doc.fontSize(14).fillColor("#334155").text("This is to certify that", { align: "center" });
  doc.moveDown(0.5);

  doc.fontSize(22).fillColor("#111827").text(participantName, { align: "center" });
  doc.moveDown(0.7);

  const lines = [
    `has successfully participated in "${subeventName}"`,
    `under the event "${eventName}".`,
  ];
  doc.fontSize(14).fillColor("#334155").text(lines.join("\n"), { align: "center" });
  doc.moveDown(0.7);

  const typeLine =
    certificateType === "winner"
      ? `Awarded: WINNER (${position || "1st"})`
      : certificateType === "runner"
        ? `Awarded: RUNNER (${position || "2nd"})`
        : "Awarded: ATTENDEE";
  doc.fontSize(14).fillColor("#0f172a").text(typeLine, { align: "center" });

  doc.moveDown(1);
  doc.fontSize(12).fillColor("#475569").text(`Date: ${dateText}`, { align: "center" });

  // QR for verification
  const qrDataUrl = await QRCode.toDataURL(verificationUrl, { margin: 1, width: 120 });
  const qrBase64 = qrDataUrl.replace(/^data:image\/png;base64,/, "");
  const qrBuffer = Buffer.from(qrBase64, "base64");
  doc.image(qrBuffer, doc.page.width / 2 - 60, doc.page.height - 220, { width: 120 });
  doc
    .fontSize(10)
    .fillColor("#64748b")
    .text("Scan to verify", 0, doc.page.height - 90, { align: "center" });

  doc.end();

  await new Promise((resolve) => doc.on("end", resolve));
  return Buffer.concat(chunks);
};

