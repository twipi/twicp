<script lang="ts">
  import Toast from "#/lib/components/Toast.svelte"
  import Router from "svelte-spa-router"

  import BrowseServices from "#/pages/BrowseServices.svelte"
  import ControlPanel from "#/pages/ControlPanel.svelte"
  import ServiceDoc from "#/pages/ServiceDoc.svelte"
  import Login from "#/pages/Login.svelte"

  import { toasts } from "#/lib/toasts"
  import { location } from "svelte-spa-router"
  import Header from "./lib/components/Header.svelte"
</script>

<div class="toast-overlay">
  {#each $toasts as toast}
    <Toast {toast} />
  {/each}
</div>

{#if !$location.startsWith("/login")}
  <Header />
{/if}

<Router
  routes={{
    "/": BrowseServices,
    "/login": Login,
    "/service/:name": ServiceDoc,
    "/service/:name/cp": ControlPanel,
  }}
/>

<style lang="scss">
  .toast-overlay {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    z-index: 10;

    display: flex;
    flex-direction: column;
    align-items: flex-end;
    padding: 1em;
    gap: 1em;
  }
</style>
