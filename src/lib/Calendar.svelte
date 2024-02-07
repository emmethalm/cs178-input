<script lang="ts">
  import GridItem from './GridItem.svelte';
  import { mouseStatus } from './stores';
  import {
    DAYS_OF_WEEK,
    HOURS,
    getHourType,
    displayHour,
    TIME_ZONES,
    OFFSETS,
    type TimeZone,
    getBlockId,
  } from './utils';

  export let mode: 'availability' | 'confirmation' = 'availability';

  let timeZones: TimeZone[] = ['EST'];

  // Bind to a button click to submit the data
  // function submit() {
  //   $.ajax({
  //     url: '/availability',
  //     type: 'POST',
  //     contentType: 'application/json',
  //     data: JSON.stringify({ availability: selectedHours }),
  //     success: function (response) {
  //       alert(response.message);
  //     },
  //   });
  // }
</script>

<div class="container">
  <div
    class="calendar"
    style={`grid-template-columns: repeat(${timeZones.length}, 8rem) repeat(${DAYS_OF_WEEK.length}, 1fr)`}
  >
    {#each timeZones as _, i}
      <div class="tz-header">
        <select bind:value={timeZones[i]}>
          {#each TIME_ZONES as tz}
            <option value={tz}>
              {tz} ({(OFFSETS[tz] >= 0 ? '+' : '') + OFFSETS[tz]})
            </option>
          {/each}
        </select>

        <!-- "Add" button positioned to right -->
        {#if i === timeZones.length - 1}
          <button
            class="add-time"
            title="Add a new time zone"
            on:click={() => {
              timeZones = [...timeZones, 'GMT'];
            }}
          >
            +
          </button>
        {/if}
      </div>
    {/each}

    {#each DAYS_OF_WEEK as day}
      <div class="day-header">{day}</div>
    {/each}

    {#each HOURS as hour}
      {#each timeZones as tz}
        <div class={`hour-header ${getHourType(hour + OFFSETS[tz])}`}>
          {displayHour(hour + OFFSETS[tz])}
          {tz}
        </div>
      {/each}

      {#each DAYS_OF_WEEK as _, dayIndex}
        <GridItem blockId={getBlockId(dayIndex, hour)} />
      {/each}
    {/each}
  </div>
</div>

<svelte:document
  on:mouseup={() => mouseStatus.set({ isDown: false, fill: undefined })}
/>

<style>
  .calendar {
    display: grid;
    /* columns are specified inline */
    grid-gap: 1px;
    text-align: center;
    margin: auto;
  }

  select {
    background-color: #2c3e50;
    color: #ffffff;
    font-weight: bold;
  }

  .tz-header {
    position: relative;
    background-color: #2c3e50;
    color: #ffffff;
    padding: 10px;
    border: 1px solid #bdc3c7;
  }

  .day-header {
    font-weight: bold;
    background-color: #2c3e50;
    color: #ffffff;
    padding: 10px;
    border: 1px solid #bdc3c7;
  }

  .add-time {
    position: absolute;
    right: 0;
    top: 50%;
    transform: translate(50%, -50%);
    padding: 4px 8px;
    z-index: 1;
    text-align: center;
  }

  .hour-header {
    display: flex;
    font-weight: 500;
    align-items: center;
    justify-content: center;
  }

  .hour-header.working-hours {
    background: linear-gradient(to right, #4caf50, #8bc34a);
    color: white;
  }

  .hour-header.waking-hours {
    background: linear-gradient(to right, #ffeb3b, #ffc107);
    color: white;
  }

  .hour-header.sleeping-hours {
    background: linear-gradient(to right, #f44336, #d32f2f);
    color: white;
  }
</style>
