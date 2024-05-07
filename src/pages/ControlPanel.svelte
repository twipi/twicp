<script lang="ts">
  import Loading from "#/lib/components/Loading.svelte"

  import { call, getControlPanel, UnauthorizedError } from "#/lib/api"
  import { push as goto } from "svelte-spa-router"
  import { fade } from "svelte/transition"
  import ServiceHeader from "#/lib/components/ServiceHeader.svelte"
  import ControlPanelOptionsList from "#/lib/components/ControlPanelOptionsList.svelte"

  export let params: { name: string }

  $: promise = call(getControlPanel, { name: params.name }, {})
    .then((p) => ({
      values: p.values,
      service: p.service!,
    }))
    .catch((e) => {
      if (e instanceof UnauthorizedError) {
        goto("/login")
      } else {
        console.error(e)
        alert("An error occurred while fetching the service control panel.")
      }
      throw e
    })
</script>

{#await promise}
  <div class="contents" transition:fade>
    <Loading text="Loading service..." />
  </div>
{:then { values, service }}
  <main class="container" transition:fade>
    <ServiceHeader {service} showDescription={false} />

    <section id="control-panel">
      <h3>Settings</h3>

      {#if service.optionsSchema}
        <!-- Top-level uncategorized options -->
        <ControlPanelOptionsList options={service.optionsSchema.options} {values} />

        <!-- Categorized options -->
        {#each service.optionsSchema.categories as category}
          <ControlPanelOptionsList options={category.options} {values} {category} />
        {/each}
      {:else}
        <p class="empty">This service does not have any settings.</p>
      {/if}
    </section>
  </main>
{/await}

<style lang="scss">
  section {
    margin-top: 3em;

    h3 {
      text-align: center;
    }
  }
</style>
