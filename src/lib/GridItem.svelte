<script lang="ts">
  import { mouseStatus, selectedHours } from './stores';
  import type { BlockId } from './utils';

  export let blockId: BlockId;
  export let mode: 'availability' | 'confirmation' = 'availability';

  $: selected = $selectedHours[blockId];

  const toggleHour = (toggle: boolean) => {
    selectedHours.update((hours) => ({
      ...hours,
      [blockId]: toggle,
    }));
  };
</script>

<div
  class={`time-slot ${
    selected
      ? mode === 'availability'
        ? 'selected-availability'
        : 'selected-confirmation'
      : ''
  }`}
  on:contextmenu|self|preventDefault|stopPropagation={() => false}
  on:mousedown|self|preventDefault={(event) => {
    // prevent on right click
    if (event.button === 2) return;
    const fill = !selected;
    mouseStatus.set({
      isDown: true,
      fill,
    });
    toggleHour(fill);
  }}
  on:mouseover={() => $mouseStatus.isDown && toggleHour($mouseStatus.fill)}
  on:focus={() => toggleHour(true)}
  role="option"
  tabindex="0"
  aria-selected={selected}
>
  {#if selected && mode === 'confirmation'}
    <input type="range" min={0} max={10} />
  {/if}
</div>

<style>
  .time-slot {
    padding: 10px;
    border: 1px solid #bdc3c7;
    background-color: #ecf0f1;
    cursor: pointer;
    min-height: 50px;
    /* Adjust the height of the time slots */
  }

  .time-slot.selected-availability {
    background-color: #3498db;
    color: #ffffff;
  }

  .time-slot.selected-confirmation {
    background-color: #2ecc71;
    color: #ffffff;
  }
</style>
