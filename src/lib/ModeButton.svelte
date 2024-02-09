<script lang="ts">
  import { mode, allCells, type CellData } from './stores';
  import type { BlockId } from './utils';

  $: handleClick = () => {
    mode.update((m) =>
      m === 'confirmation' ? 'availability' : 'confirmation'
    );
    // clear the confirmation selection
    allCells.update((data) =>
      Object.fromEntries(
        Object.entries(data).map(
          ([key, cell]): [BlockId, CellData] =>
            [
              key as BlockId,
              {
                cellStatus: cell.cellStatus ? 'available' : false,
                tolerance: cell.tolerance,
              },
            ] as const
        )
      )
    );
  };
</script>

<div class="container">
  <button on:click={handleClick}>
    {$mode === 'availability' ? 'Confirm' : 'Back'}
  </button>
</div>

<style>
  .container {
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
