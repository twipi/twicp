<script lang="ts">
  import { fade, fly } from "svelte/transition"

  export let open = false
  export let title = "Dialog"

  let className = "dialog"
  export { className as class }
</script>

{#if open}
  <dialog open class={className} transition:fly={{ y: 20, duration: 150 }}>
    <article>
      <header>
        <button
          class="close"
          aria-label="Close"
          on:click|preventDefault={() => {
            open = false
          }}
        >
        </button>

        <slot name="header">
          <h3>{title}</h3>
        </slot>
      </header>

      <slot />
    </article>
  </dialog>
{/if}

<style lang="scss">
  header button.close {
    box-shadow: none;
  }
</style>
