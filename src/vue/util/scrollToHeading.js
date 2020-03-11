function isAnchored (route) {
  return /#[\w-]+$/.test(route)
}

export default function scrollToHeading (fullPath, options) {
  options = {
    container: document,
    scrollIntoView: { behavior: 'auto', block: 'start' },
    ...options
  }

  if (!isAnchored(fullPath)) {
    options.container.scrollTop = 0
  } else {
    const slug = fullPath
            .split('#')[1] // Get end of URL
            .split('.')[0] // Remove file extension
            .toLowerCase(),
          anchor = options.container.querySelector(`#${slug}`),
          heading = anchor ? anchor.parentNode : undefined

    if (heading !== undefined) heading.scrollIntoView(options.scrollIntoView)
  }
}
