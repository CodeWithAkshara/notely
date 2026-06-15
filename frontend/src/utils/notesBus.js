const listeners = new Set();

export function subscribeNotesRefresh(cb) {
  listeners.add(cb);
  return () => listeners.delete(cb);
}

export function notifyNotesRefresh() {
  listeners.forEach((cb) => {
    try {
      cb();
    } catch (e) {
      console.error("notesBus handler error", e);
    }
  });
}
