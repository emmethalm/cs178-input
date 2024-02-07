<script lang="ts">
  import { mode, mouseStatus, selectedHours } from './stores';
  import { maxAttendees, type BlockId } from './utils';

  let tolerance = 10; // preference from 0 to 10

  export let blockId: BlockId;

  $: selected = $selectedHours[blockId];

  const toggleHour = (toggle: boolean) => {
    selectedHours.update((hours) => ({
      ...hours,
      [blockId]: toggle,
    }));
  };
</script>

<div
  class={`time-slot ${$mode === 'availability' ? 'available' : ''} ${
    selected
      ? $mode === 'availability'
        ? 'selected-availability'
        : 'selected-confirmation'
      : ''
  }`}
  on:contextmenu|self|preventDefault={() => false}
  on:mousedown|self|preventDefault={(event) => {
    // prevent on right click
    if (event.button === 2 || $mode !== 'availability') return;
    const fill = !selected;
    mouseStatus.set({
      isDown: true,
      fill,
    });
    toggleHour(fill);
  }}
  on:mouseover={() =>
    $mode === 'availability' &&
    $mouseStatus.isDown &&
    toggleHour($mouseStatus.fill)}
  on:focus={() => toggleHour(true)}
  role="option"
  tabindex="0"
  aria-selected={selected}
>
  {#if selected && $mode === 'confirmation'}
    <input type="range" bind:value={tolerance} min={1} max={maxAttendees} />
    <span>{'😁'.repeat(tolerance)}{'❌'.repeat(maxAttendees-tolerance)}</span>
    <!-- {#if tolerance >= 8}
      <span>Definitely</span>
    {:else if tolerance >= 4}
      <span>Depends</span>
    {:else}
      <span>If necessary</span>
    {/if} -->
  {/if}
</div>

<style>
  .time-slot {
    padding: 10px;
    border: 1px solid #bdc3c7;
    background-color: #ecf0f1;
    min-height: 50px;
    display: flex;
    flex-direction: column;
    place-items: center;
  }

  .available {
    cursor: pointer;
    opacity: 0.8;
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
