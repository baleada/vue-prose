const symbols = {
  layout: {
    messages: Symbol('messages'),
    fullPath: Symbol('fullPath'),
    setHeadings: Symbol('setHeadings'),
    headings: Symbol('headings'),
  },
  article: {
    addHeading: Symbol('addHeading'),
    headings: Symbol('headings'),
    setFrontMatter: Symbol('setFrontMatter'),
    frontMatter: Symbol('frontMatter'),
    setStats: Symbol('setStats'),
    stats: Symbol('stats'),
    setFilePath: Symbol('setFilePath'),
    filePath: Symbol('filePath'),
  },
  grid: {
    filterQuery: Symbol('filterQuery'),
    computedFilterIsCaseSensitive: Symbol('computedFilterIsCaseSensitive'),
    setRowIsFiltered: Symbol('setRowIsFiltered'),
    focused: Symbol('focused'),
    setFocused: Symbol('setFocused'),
  },
  list: {
    addRow: Symbol('addRow'),
  },
  rowgroup: {
    index: Symbol('index'),
  },
  row: {
    index: Symbol('index'),
  }
}

export default function useSymbol (collection, name) {
  return symbols[collection][name]
}
