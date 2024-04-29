<script lang="ts">
  import Launch from "svelte-google-materialdesign-icons/Launch.svelte"
  import Loading from "#/lib/components/Loading.svelte"

  import { fade } from "svelte/transition"
  import { hostname } from "#/lib/canonical"
  import { call, getService } from "#/lib/api"

  export let params: { name: string }
  $: promise = call(getService, { name: params.name }, {}).then((p) => p.service!)

  let title = params.name
  $: (async () => {
    const service = await promise
    title = service.humanName ?? service.name
  })()
</script>

<svelte:head>
  <title>{title} - Twipi</title>
</svelte:head>

{#await promise}
  <div class="contents" transition:fade>
    <Loading text="Loading service..." />
  </div>
{:then service}
  <main class="container" transition:fade>
    <header class="shadow">
      <img class="brand-icon inverted" src={service.iconUrl} alt={service.name + " icon"} />
      <div>
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

        {#if service.description}
          <p class="description">{service.description}</p>
        {/if}
      </div>
    </header>

    <section id="commands">
      <h3>Documentation</h3>
      <ul class="commands-list">
        {#each service.commands as command}
          <li>
            <h4 class="command-usage">
              <code>
                <span class="slash">/</span><span class="service">{service.name}</span>
                <span class="command">{command.name}</span>
                {#if command.argumentPositions}
                  <span class="arguments">
                    {#each command.argumentPositions as name}
                      <span class="argument">{name}</span>
                      <span></span>
                    {/each}
                  </span>
                {/if}
              </code>
            </h4>

            {#if command.description}
              <p>{command.description}</p>
            {/if}

            <ol class="arguments-list">
              {#each Object.entries(command.arguments) as [name, argument]}
                <li>
                  <h5 class="argument-name"><code>{name}</code></h5>
                  {#if argument.description}
                    <p>{argument.description}</p>
                  {/if}
                </li>
              {/each}
            </ol>
          </li>
        {/each}
      </ul>
    </section>
  </main>
{/await}

<style lang="scss">
  header {
    display: flex;
    align-items: center;

    margin: var(--pico-spacing) 0;
    padding: 1em 0;

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
  }

  section {
    margin-top: 3em;

    h3 {
      text-align: center;
    }
  }

  #commands {
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;

    ul,
    li {
      list-style: none;
      padding: 0;
    }

    h4,
    h5,
    p {
      margin: 0;
    }

    .commands-list {
      & > li {
        margin: 2.5em 0;

        & > p {
          padding-left: 0.75em;
        }
      }
    }

    .arguments-list {
      padding-left: 0.85em;
      font-size: 0.9em;
      max-width: max(350px, 80%);

      margin-top: 1.5em;
      margin-bottom: 2em;
      & > li {
        margin: var(--pico-spacing) 0;
      }
    }

    h4,
    h5 {
      margin-bottom: 0.5em;
    }

    h4.command-usage {
      color: var(--pico-code-color);
      font-weight: bold;
      font-size: 1em;

      .slash,
      .service {
        color: var(--pico-color-azure-250);
      }

      .command {
        color: var(--pico-color-azure-450);
      }
    }

    h5.argument-name {
      font-weight: bold;
      font-size: inherit;
      margin: calc(var(--pico-spacing) / 2) 0;
    }

    code {
      background: none;
      padding: 0;
      color: inherit;
      font-size: inherit;
      font-weight: inherit;
    }
  }
</style>
