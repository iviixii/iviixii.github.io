// Generated by nitro
import type { Serialize, Simplify } from "nitropack/types";
declare module "nitropack/types" {
  type Awaited<T> = T extends PromiseLike<infer U> ? Awaited<U> : T
  interface InternalApi {
    '/v1/hello': {
      'default': Simplify<Serialize<Awaited<ReturnType<typeof import('../../../src/server/routes/v1/hello').default>>>>
    }
  }
}
export {}