export default function simpleSlugify (string) {
  return string
    .replace(/'/g, '')
    .replace(/[^a-záéíóúñäëïöüçøñâêîôû0-9]/gi, '-')
    .replace(/-{2,}/g, '-')
    .replace(/^-/, '').replace(/-$/, '')
    .toLowerCase()
}
