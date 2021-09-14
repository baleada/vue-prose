import { createAside } from './components/createAside'
import { createBlockquote } from './components/createBlockquote'
import { createCodeblock } from './components/createCodeblock'
import { createDetails } from './components/createDetails'
import { createHeading } from './components/createHeading'
import { createList } from './components/createList'
import { createMedia } from './components/createMedia'
import { createSection } from './components/createSection'
import { createTable } from './components/createTable'
import { createProse } from './createProse'
import { useStore, useEffects } from './composition'

export {
  // Setup
  createProse,
  useStore,
  useEffects,

  // Higher order components
  createAside,
  createBlockquote,
  createCodeblock,
  createDetails,
  createHeading,
  createList,
  createMedia,
  createSection,
  createTable,
}

// Make the higher order components look like normal components
// for people who want to treeshake
export const BaleadaProseAside = createAside
export const BaleadaProseBlockquote = createBlockquote
export const BaleadaProseCodeblock = createCodeblock
export const BaleadaProseDetails = createDetails
export const BaleadaProseHeading = createHeading
export const BaleadaProseList = createList
export const BaleadaProseMedia = createMedia
export const BaleadaProseSection = createSection
export const BaleadaProseTable = createTable

// Exported for ease of configuring all
export const components = [
  createAside,
  createBlockquote,
  createCodeblock,
  createDetails,
  createHeading,
  createList,
  createMedia,
  createSection,
  createTable,
]
