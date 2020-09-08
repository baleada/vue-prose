import { reactive } from 'vue'
import { context } from '../state'

export default function useContext () {
  return reactive(context.data)
}
