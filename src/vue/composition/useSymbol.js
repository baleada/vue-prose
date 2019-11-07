import symbols from '../util/symbols'

export default function useSymbol (collection, name) {
  return symbols[collection][name]
}
