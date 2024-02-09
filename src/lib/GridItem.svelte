<script lang="ts">
  import {
    mode,
    mouseStatus,
    allCells,
    type CellStatus,
    type CellData,
  } from './stores';
  import { maxAttendees, type BlockId, type ChangeEvent } from './utils';

  export let blockId: BlockId;

  $: cellData = $allCells[blockId] ?? {
    cellStatus: false,
    tolerance: Math.floor((maxAttendees * 3) / 4),
  };

  $: setCellStatus = (cellStatus: CellStatus) => {
    allCells.update((data) => ({
      ...data,
      [blockId]: {
        cellStatus,
        tolerance: cellData.tolerance,
      },
    }));
  };

  $: handleMouseDown = (event: MouseEvent) => {
    // prevent on right click
    if (event.button === 2) return;
    if ($mode === 'confirmation' && cellData.cellStatus === false) return;

    const targetStatus =
      $mode === 'availability'
        ? cellData.cellStatus
          ? false
          : 'available'
        : cellData.cellStatus === 'available'
          ? 'configuring'
          : 'available';
    mouseStatus.set({
      isDown: true,
      targetStatus,
    });
    setCellStatus(targetStatus);
  };

  $: handleChange = (event: ChangeEvent) => {
    const keys = (Object.keys($allCells) as BlockId[]).filter(
      (key) => $allCells[key].cellStatus === 'configuring'
    );
    if (keys.length === 0 || !keys.includes(blockId)) return; // this cell is already handled by bind:value

    const tolerance = event.currentTarget.valueAsNumber;
    allCells.update((data) =>
      // set tolerance for all provided keys
      Object.assign(
        {},
        data,
        ...keys.map(
          (key): Record<BlockId, CellData> => ({
            [key]: { ...data[key], tolerance },
          })
        )
      )
    );
  };

  $: cellStyle = (() => {
    if (cellData.cellStatus === false) {
      if ($mode === 'confirmation') return 'available-disabled';
      return 'available';
    }
    if (cellData.cellStatus === 'available') return 'selected-availability';
    if (cellData.cellStatus === 'configuring') return 'selected-confirmation';
    return '';
  })();
</script>

<div
  class={`time-slot ${cellStyle}`}
  on:contextmenu|self|preventDefault={() => false}
  on:mousedown|self|preventDefault={handleMouseDown}
  on:mouseover={() =>
    $mouseStatus.isDown && setCellStatus($mouseStatus.targetStatus)}
  on:focus={() => setCellStatus('available')}
  role="option"
  tabindex="0"
  aria-selected={Boolean(cellData)}
>
  {#if cellData.cellStatus !== false}
    <input
      type="range"
      bind:value={cellData.tolerance}
      min={1}
      max={maxAttendees}
      on:input={handleChange}
    />
    <span class="emojis">
      {'👤'.repeat(cellData.tolerance)}😺{'❌'.repeat(
        maxAttendees - cellData.tolerance
      )}
    </span>
  {/if}
</div>

<style>
  .time-slot {
    padding: 10px;
    border: 1px solid #bdc3c7;
    background-color: #ecf0f1;
    min-height: 3rem;
    min-width: 8rem;

    display: flex;
    flex-direction: column;
    place-items: center;
  }

  .available {
    cursor: pointer;
    opacity: 0.8;
  }

  .available-disabled {
    cursor: not-allowed;
    background-color: #bdc3c7;
  }

  .time-slot.selected-availability {
    background-color: #3498db;
    color: #ffffff;
  }

  .time-slot.selected-confirmation {
    background-color: #2ecc71;
    color: #ffffff;
  }

  .emojis {
    pointer-events: none;
    font-size: 0.5em;
    margin-top: 1em;
  }
</style>
