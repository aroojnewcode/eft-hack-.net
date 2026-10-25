export function sectionId(heading: string) {
  return heading
    .replace(/^\d+\)\s*/, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}
