<script lang="ts">
  import ControlPanelOptionItem from "./ControlPanelOptionItem.svelte"

  import { OptionType, OptionValue } from "../proto/twicmdcfg"

  export let options: OptionType[]
  export let values: OptionValue[]

  export let category:
    | {
        title: string
        description: string
      }
    | undefined = undefined
</script>

{#if category}
  <hgroup class="category">
    <h4>{category.title}</h4>
    {#if category.description}<p>{category.description}</p>{/if}
  </hgroup>
{/if}

<ul class="options-list">
  {#each options as option}
    {#key option.id}
      <li>
        <ControlPanelOptionItem {option} value={values.find((v) => v.id == option.id)} />
      </li>
    {/key}
  {/each}
</ul>

<style lang="scss">
  ul,
  li {
    list-style: none;
    padding: 0;
  }

  li {
    margin: var(--pico-spacing) 0;
  }
</style>
