<script lang="ts">
  import { type Toast, removeToast } from "#/lib/toasts.js"
  import Close from "svelte-google-materialdesign-icons/Close.svelte"
  import { fly } from "svelte/transition"

  export let toast: Toast
</script>

<div
  class="toast shadow"
  class:info={toast.type === "info"}
  class:error={toast.type === "error"}
  class:notification={toast.type === "notification"}
  role="alert"
  transition:fly={{ x: 40, duration: 200 }}
>
  <div class="content">
    <h3>{toast.title}</h3>
    <p>{toast.message}</p>
  </div>
  <button class="close" on:click={() => removeToast(toast)}>
    <Close variation="filled" />
  </button>
</div>

<style lang="scss">
  .toast {
    padding: calc(var(--pico-spacing) / 2);
    padding-left: calc(var(--pico-spacing) / 1.5);
    display: flex;
    gap: calc(var(--pico-spacing) / 2);
    align-items: center;
    border-radius: var(--pico-border-radius);

    width: 100%;
    max-width: min(350px, 80vw);

    &.info {
      background-color: var(--pico-color-azure);
      * {
        color: white;
      }
    }

    &.error {
      background-color: var(--pico-form-element-invalid-focus-color);
      * {
        color: white;
      }
    }

    &.notification {
      background-color: var(--pico-primary-background);
      * {
        color: white;
      }
    }

    .content {
      flex: 1;

      h3,
      p {
        margin: calc(var(--pico-spacing) / 4) 0;
        line-height: 1.35;
      }

      h3 {
        font-weight: bold;
        font-size: 1em;
      }

      p {
        font-size: 0.95em;
      }
    }

    button.close {
      --shadow-distance: 0;

      background: none;
      border: none;
      padding: calc(var(--pico-spacing) / 2);

      &:hover {
        background-color: rgba(255, 255, 255, 0.25);
      }
    }
  }
</style>
