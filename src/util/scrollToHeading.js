function isAnchored (route) {
  return /#[\w-]+$/.test(route)
}

export default function scrollToHeading (fullPath, options) {
  options = {
    container: () => document,
    scrollIntoView: { behavior: 'auto', block: 'start' },
    ...options
  }

  const { container, scrollIntoView } = options

  if (!isAnchored(fullPath)) {
    container().scrollTop = 0
    // top().scrollIntoView(scrollIntoView)
  } else {
    const slug = fullPath
            .split('#')[1] // Get end of URL
            .split('.')[0] // Remove file extension
            .toLowerCase(),
          anchor = container().querySelector(`#${slug}`),
          heading = anchor ? anchor.parentNode : undefined

    if (heading !== undefined) heading.scrollIntoView(scrollIntoView)
  }
}
