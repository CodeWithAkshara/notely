export async function copyToClipboard(content) {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(content);
      return true;
    } else {
      const ta = document.createElement("textarea");
      ta.value = content;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.focus();
      ta.select();
      const success = document.execCommand("copy");
      document.body.removeChild(ta);
      return success;
    }
  } catch (err) {
    console.error("copy failed", err);
    return false;
  }
}

export function downloadNoteAsTxt(note) {
  const { title = "note", content = "", updatedAt } = note;
  const date = updatedAt ? new Date(updatedAt).toLocaleString() : "";
  const fileContent = `Title: ${title}\nLast Updated: ${date}\n\n--- Content ---\n\n${content}`;
  const blob = new Blob([fileContent], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const sanitized =
    String(title)
      .replace(/[^a-z0-9]/gi, "_")
      .toLowerCase() || "note";
  const a = document.createElement("a");
  a.href = url;
  a.download = `${sanitized}.txt`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
