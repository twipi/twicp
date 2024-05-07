<script lang="ts">
  import Launch from "svelte-google-materialdesign-icons/Launch.svelte"
  import Settings from "svelte-google-materialdesign-icons/Settings.svelte"

  import { Service } from "#/lib/proto/twicmd"
  import { session } from "#/lib/api"
  import { hostname } from "#/lib/canonical"

  export let service: Service
  export let showDescription = true
</script>

<header class="shadow">
  <img class="brand-icon inverted" src={service.iconUrl} alt={service.name + " icon"} />

  <div class="info">
    <hgroup>
      <h2>{service.humanName ?? service.name}</h2>

      {#if service.websiteUrl}
        <p class="website-url">
          Website:
          <a href={service.websiteUrl} class="website-url" target="_blank">
            <span>{hostname(service.websiteUrl)}</span>
            <Launch size="16" /></a
          >
        </p>
      {/if}
    </hgroup>

    {#if showDescription && service.description}
      <p class="description">{service.description}</p>
    {/if}
  </div>

  <slot name="tail" />
</header>

<style lang="scss">
  header {
    display: flex;
    align-items: center;

    margin: var(--pico-spacing) 0;
    padding: 1em 0;
    padding-right: var(--pico-spacing);

    color: var(--pico-secondary-inverse);
    background-color: var(--pico-secondary-background);
    border-radius: var(--pico-border-radius);

    img.brand-icon {
      width: 6em;
      height: 6em;
      margin: var(--pico-spacing) calc(var(--pico-spacing) * 2);
      object-fit: contain;
    }

    hgroup {
      margin-bottom: 1em;

      &:last-child {
        margin: 0;
      }

      h2 {
        color: inherit;
        margin: 0;
        line-height: 1.25;
      }
    }

    p {
      margin-bottom: 0;
      color: inherit;
    }

    a {
      color: inherit;
    }

    p.website-url {
      font-size: 0.85em;
    }

    p.description {
      font-size: 1.1em;
    }

    .info {
      flex: 1;
    }
  }
</style>
