// Utilitários de data/tempo (isolados para reuso em outros lugares)
export function parseDatePtBr(str) {
  if (!str) return new Date(0);
  const [datePart, timePart = "00:00"] = str.split(" ");
  const [day, month, year] = datePart.split("/").map(Number);
  const [hour, minute] = timePart.split(":").map(Number);
  return new Date(year, (month || 1) - 1, day || 1, hour || 0, minute || 0);
}

export function formatDatePtBr(date) {
  try {
    return new Intl.DateTimeFormat("pt-BR", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).format(date);
  } catch {
    return "";
  }
}
