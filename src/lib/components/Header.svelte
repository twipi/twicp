<script lang="ts">
  import { session } from "#/lib/api"
  import { link } from "svelte-spa-router"

  export let title = "Twipi"
  export let container = true
</script>

<header class:container>
  <h1>
    <a href="/" use:link>
      <img src="/favicon.png" alt="Twipi Logo" class="shadow" />
      <b>{title}</b>
    </a>
  </h1>
  <aside>
    {#if $session}
      {$session.phoneNumber}
    {:else}
      <a use:link href="/login">Login</a>
    {/if}
  </aside>
</header>

<style lang="scss">
  header {
    height: 3em;
    font-size: 1.15em;

    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    h1 {
      font-size: 1em;
      margin: 0;

      img {
        --shadow-distance: 0.135em;
        width: 1.5em;
        height: auto;
        margin-right: 0.25em;
        border-radius: 0.25em;
      }

      b {
        vertical-align: text-bottom;
      }

      a {
        text-decoration: none;
      }
    }

    aside {
      a {
        text-decoration: underline dashed;
      }
    }
  }
</style>
