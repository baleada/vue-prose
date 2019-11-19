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
    filterQuery: Symbol('filterQuery'),
    filterQueryIsCaseSensitive: Symbol('filterQueryIsCaseSensitive'),
    focusedCell: Symbol('focusedCell'),
    setFiltered: Symbol('setIsFiltered'),
  },
}

export default function useSymbol (collection, name) {
  return symbols[collection][name]
}
