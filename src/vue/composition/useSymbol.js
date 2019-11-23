const symbols = {
  layout: {
    isDarkTheme: Symbol('isDarkTheme'),
    isMinimalistTheme: Symbol('isMinimalistTheme'),
    fullPath: Symbol('fullPath'),
    addHeading: Symbol('addHeading'),
    manifest: Symbol('manifest'),
  },
  article: {
    setFrontMatter: Symbol('setFrontMatter'),
    setStats: Symbol('setStats'),
  },
  grid: {
    addRowgroup: Symbol('addRowgroup'),
    addRow: Symbol('addRow'),
    addGridcell: Symbol('addGridcell'),
    filterQuery: Symbol('filterQuery'),
    filterQueryIsCaseSensitive: Symbol('filterQueryIsCaseSensitive'),
    focusedCell: Symbol('focusedCell'),
    setFiltered: Symbol('setIsFiltered'),
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
