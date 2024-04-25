import * as routes from "./routes"
export * from "./routes"

import { localWritable as persisted } from "@macfja/svelte-persistent-store"
import { get } from "svelte/store"

export const token = persisted<string | undefined>("token")

export class PathError extends Error {
  constructor(
    public route: routes.Route,
    public path: string,
  ) {
    super(`expected path "${route.path}", got "${path}"`)
  }
}

function assertPathParams(route: routes.Route, path: string) {
  const parts1 = route.path.split("/")
  const parts2 = path.split("/")
  if (parts1.length !== parts2.length) {
    throw new PathError(route, path)
  }
  for (let i = 0; i < parts1.length; i++) {
    if (parts1[i].startsWith(":")) {
      if (parts1[i] === parts2[i]) {
        throw new PathError(route, path)
      }
    } else {
      if (parts1[i] !== parts2[i]) {
        throw new PathError(route, path)
      }
    }
  }
}

export async function call<T extends routes.Route>(
  route: T,
  path: string = route.path,
  body?: routes.RequestTypeOf<T>,
): Promise<routes.ResponseTypeOf<T>> {
  assertPathParams(route, path)

  if (body && !route.requestType) {
    throw new Error("unexpected body")
  }

  const headers = new Headers()
  if (route.requestType) {
    headers.set("Content-Type", "application/json")
  }
  const t = get(token)
  if (t) {
    headers.set("Authorization", `Bearer ${t}`)
  }

  const resp = await fetch(routes.baseURL + path, {
    method: route.method,
    headers,
    body: body && JSON.stringify(route.requestType.toJSON(body)),
  })

  if (!resp.ok) {
    throw new Error(`unexpected status code ${resp.status}`)
  }

  if (!route.responseType) {
    return undefined as routes.ResponseTypeOf<T>
  }

  const json = await resp.json()
  return route.responseType.fromJSON(json) as routes.ResponseTypeOf<T>
}
