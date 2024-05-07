<script lang="ts">
  import Add from "svelte-google-materialdesign-icons/Add.svelte"
  import Done from "svelte-google-materialdesign-icons/Done.svelte"

  import { OptionType, OptionValue } from "../proto/twicmdcfg"
  import Dialog from "./Dialog.svelte"

  export let option: OptionType
  export let value: OptionValue | undefined

  let stringListEditing = false
</script>

<hgroup>
  <h4>{option.name}</h4>
  <p>{option.description}</p>
</hgroup>

{#if value}
  {#if value.int}
    <form class="value-int">
      <input type="number" value={value.int} />
    </form>
  {/if}

  {#if value.string}
    <form class="value-int">
      <input
        type="text"
        value={option.string?.sensitive ? null : value.string}
        placeholder={option.string?.sensitive ? "(unchanged)" : ""}
        required={!option.string?.sensitive && option.string?.required}
      />
    </form>
  {/if}

  {#if value.stringList}
    <form
      class="value-string-list"
      on:submit|preventDefault={async (ev) => {
        // TODO
      }}
    >
      {#if option.stringList?.structuringSeparator}
        {#if value.stringList.values.length > 0}
          <table>
            <tr>
              {#each option.stringList?.structuringColumns as column}
                <th>{column}</th>
              {/each}
            </tr>

            {#each value.stringList.values as string}
              <tr>
                {#each string.split(option.stringList.structuringSeparator) as column}
                  <td>{column}</td>
                {/each}
              </tr>
            {/each}
          </table>
        {:else}
          <p class="empty">No entries yet. Click <Add size="20" /> to add one.</p>
        {/if}
      {/if}

      <button
        class="add no-shadow outline secondary"
        on:click|preventDefault={() => {
          stringListEditing = true
        }}
      >
        <Add /> Add
      </button>

      <Dialog bind:open={stringListEditing} title={option.name}>
        <form class="add-form" on:submit|preventDefault={() => {}}>
          {#if option.stringList?.structuringColumns}
            {#each option.stringList.structuringColumns as column}
              <label>
                {column}
                <input type="text" />
              </label>
            {/each}
          {:else}
            <p>Enter the values:</p>
            <textarea rows="2"></textarea>
          {/if}

          <button type="submit" class="success no-shadow">
            <Done /> Apply
          </button>
        </form>
      </Dialog>
    </form>
  {/if}
{/if}

<style lang="scss">
  hgroup {
    * {
      margin: 0;
      line-height: 1.5;
    }
  }

  .value-string-list {
    display: flex;
    flex-direction: column;

    button :global(svg) {
      vertical-align: bottom;
    }

    button.add {
      padding-right: 1.25em;
      align-self: flex-end;
    }

    .add-form {
      label {
        margin: 0;
      }
      button {
        margin: 1em 0;
      }
    }

    .empty {
      color: var(--pico-muted-color);
      font-weight: 300;
      text-align: center;

      :global(svg) {
        vertical-align: text-bottom;
      }
    }
  }
</style>
