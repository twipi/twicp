<script lang="ts">
  import Loading from "#/lib/components/Loading.svelte"
  import Header from "#/lib/components/Header.svelte"
  import Launch from "svelte-google-materialdesign-icons/Launch.svelte"

  import { fade } from "svelte/transition"
  import { call, listServices } from "#/lib/api"

  const promise = call(listServices, {}, {}).then((p) => {
    console.log(p)
    return p
  })

  function isValidColor(color: string | undefined): boolean {
    return !!color && !!color.match(/^#[0-9a-f]{6}$/i)
  }

  function hostname(url: string): string {
    return new URL(url).hostname
  }
</script>

{#await promise}
  <div class="contents" transition:fade>
    <Loading text="Loading services..." />
  </div>
{:then list}
  <Header />

  <main class="container" transition:fade>
    <h2>Applications</h2>
    <ul id="services-list">
      {#each list.services as service}
        <li>
          <a
            role="button"
            href="/service/{service.name}"
            class="outline shadow fat-padding"
            style={isValidColor(service.color) ? `--color: ${service.color}` : undefined}
          >
            {#if service.iconUrl}
              <img
                class="brand-icon"
                src={service.iconUrl}
                alt="Icon for {service.humanName ?? service.name}"
              />
            {/if}
            <div>
              <h3>
                {service.humanName ?? service.name}
                {#if service.websiteUrl}
                  <span class="website-url">
                    (<a href={service.websiteUrl} target="_blank">
                      <span>{hostname(service.websiteUrl)}</span>
                      <Launch size="16" /></a
                    >)
                  </span>
                {/if}
              </h3>
              {#if service.description}
                <p>{service.description}</p>
              {/if}
            </div>
          </a>
        </li>
      {/each}
    </ul>
  </main>
{/await}

<style lang="scss">
  h2 {
    text-align: center;
  }

  #services-list {
    padding: 0;

    &,
    li {
      list-style: none;
    }

    a[role="button"] {
      display: flex;
      gap: var(--pico-spacing);

      img.brand-icon {
        width: 4rem;
        height: 4rem;
        object-fit: contain;
        filter: saturate(0) brightness(0.5) contrast(1.5);
      }

      div {
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: calc(var(--pico-spacing) / 4);

        * {
          margin: 0;
          text-align: left;
        }
      }

      .website-url {
        font-size: 0.65em;
        font-weight: normal;

        a {
          text-decoration: none;

          span {
            text-decoration: underline dashed;
          }
        }
      }
    }
  }
</style>
