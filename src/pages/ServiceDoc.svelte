<script lang="ts">
  import Settings from "svelte-google-materialdesign-icons/Settings.svelte"
  import Loading from "#/lib/components/Loading.svelte"

  import { fade } from "svelte/transition"
  import { link } from "svelte-spa-router"
  import { call, getService, session, cachedService } from "#/lib/api"
  import ServiceHeader from "#/lib/components/ServiceHeader.svelte"

  export let params: { name: string }
  $: promise = call(getService, { name: params.name }, {})
    .then((p) => p.service!)
    .then((s) => {
      $cachedService = s
      return s
    })

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
    <ServiceHeader {service}>
      <div class="header-controls" slot="tail">
        {#if service.optionsSchema && $session}
          <a use:link href="/service/{service.name}/cp" role="button" title="Settings" class="flat">
            <Settings />
            <span>Settings</span>
          </a>
        {/if}
      </div>
    </ServiceHeader>

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
  .header-controls {
    [role="button"].flat {
      color: inherit;
      border: none;
      box-shadow: none;
      background: none;
      border-radius: 99px;

      display: flex;
      justify-content: center;
      align-items: center;

      &:hover {
        background: var(--pico-secondary);
      }

      span {
        margin-left: 0.35em;

        @media (max-width: 480px) {
          display: none;
        }
      }
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
