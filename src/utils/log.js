export function warn(message) {
  console.warn(`[warn]:${message}`);
}

export function error(message) {
  throw new Error(`[error]:${message}`);
}
