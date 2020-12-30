export default function simpleSlugify (string) {
  return string
    .normalize("NFD").replace(/[\u0300-\u036f]/g, '') // remove diacritics
    .replace(/'/g, '')
    .replace(/[^a-z0-9]/gi, '-')
    .replace(/-{2,}/g, '-')
    .replace(/^-/, '').replace(/-$/, '')
    .toLowerCase()
}
