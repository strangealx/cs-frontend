import { sleep } from './sleep'

export const timeout = <T>(promise: Promise<T>, ms: number): Promise<T> => Promise.race([
  promise,
  sleep(ms).then(() => {
    throw new Error('Timeout exceeded')
  }),
])