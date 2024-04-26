import * as routes from "./routes"
export * from "./routes"

import { localWritable as persisted } from "@macfja/svelte-persistent-store"
import { get } from "svelte/store"

export const session = persisted<
  | undefined
  | {
      token: string
      phoneNumber: string
    }
>("token")

export class PathError extends Error {
  constructor(
    public route: routes.Route,
    public path: string,
  ) {
    super(`expected path "${route.path}", got "${path}"`)
  }
}

function buildPathParams(route: routes.Route, params: Record<string, string>): string {
  const parts1 = route.path.split("/")
  for (let i = 0; i < parts1.length; i++) {
    if (parts1[i].startsWith(":")) {
      const key = parts1[i].slice(1)
      if (!params[key]) {
        throw new Error(`missing URL parameter ${key}`)
      }
      parts1[i] = params[key]
    }
  }
  return parts1.join("/")
}

export async function call<T extends routes.Route>(
  route: T,
  urlParams: Record<string, string>,
  request: routes.RequestTypeOf<T>,
): Promise<routes.ResponseTypeOf<T>> {
  const headers = new Headers()
  if (route.requestType) {
    headers.set("Content-Type", "application/json")
  }

  const s = get(session)
  if (s) {
    headers.set("Authorization", `Bearer ${s.token}`)
  }

  const url = new URL(routes.baseURL + buildPathParams(route, urlParams))
  let body

  if (request) {
    const json = JSON.stringify(route.requestType.toJSON(request))
    if (route.method === "GET") {
      url.searchParams.set("params", json)
    } else {
      body = json
    }
  }

  const resp = await fetch(url, {
    method: route.method,
    headers,
    body,
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
