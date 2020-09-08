import { nextTick } from 'vue'
import { context } from '../state'

export default function useContext (writeCallback) {
  if (!writeCallback) {
    return context.data
  }
  
  nextTick(() => writeCallback(context.data))
}
