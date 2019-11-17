const symbols = {
  layout: {
    isDarkTheme: Symbol('isDarkTheme'),
    isMinimalistTheme: Symbol('isMinimalistTheme'),
    fullPath: Symbol('fullPath'),
    addHeading: Symbol('addHeading'),
    manifest: Symbol('manifest'),
  },
  article: {
    setTitle: Symbol('setTitle'),
    setMTime: Symbol('setMTime'),
  },
  grid: {
    filterQuery: Symbol('filterQuery'),
    filterQueryIsCaseSensitive: Symbol('filterQueryIsCaseSensitive'),
    focusedCell: Symbol('focusedCell'),
    setFiltered: Symbol('setIsFiltered'),
  },
}

export default symbols
