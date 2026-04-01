export function sanitizeHtml(dirty: string): string {
  // If we ever need to sanitize HTML safely on server, we can use a dedicated library like 'striptags' or 'xss'.
  // Currently unused. Let's just strip basic script/iframe tags as a primitive substitute.
  return dirty.replace(/<(script|iframe|object|embed|svg|math)[^>]*>.*?<\/\1>/gi, '');
}

export function sanitizeText(dirty: string): string {
  if (!dirty) return '';
  // Strip all HTML tags
  return dirty.replace(/<[^>]*>?/gm, '');
}
