import { writable } from "svelte/store"

export type Toast = {
  type: "info" | "error" | "notification"
  message: string
  title?: string
  id?: number // auto-incremented
}

let lastID = 0

// toasts is a store that contains all the toasts that are currently visible.
export const toasts = writable<Toast[]>([])

export type AddedToast = Toast & {
  id: number
  remove(): void
}

// addToast adds a new toast to the toasts store.
export function addToast(toast: Toast): AddedToast {
  const id = lastID++
  toast = {
    ...toast,
    id,
    title: toast.title ?? (toast.type == "error" ? "Error" : undefined),
  }
  toasts.update((prev) => [...prev, toast])
  return {
    ...toast,
    id,
    remove: () => removeToast(toast),
  }
}

// removeToast removes a toast from the toasts store.
export function removeToast(toast: Toast) {
  toasts.update((prev) => prev.filter((t) => t.id !== toast.id))
}
