<script lang="ts">
  type TimeZone = {
    name: string;
    offset: number;
  };
  type MouseStatus =
    | {
        isDown: true;
        fill: boolean;
      }
    | {
        isDown: false;
        fill: undefined;
      };
  type BlockId = `day-${number}-hour-${number}`;

  const getHourType = (rawHour: number) => {
    const hour = rawHour % 24;
    if (9 <= hour && hour <= 17) {
      return 'working-hours';
    }
    if ((7 <= hour && hour < 9) || (17 < hour && hour < 23)) {
      return 'waking-hours';
    }
    return 'sleeping-hours';
  };

  const displayHour = (rawHour: number) => {
    const hour = rawHour % 24;
    if (hour < 12) {
      return `${hour}:00 AM`;
    }
    return `${hour % 12 || 12}:00 PM`;
  };

  let timeZones: TimeZone[] = [
    {
      name: 'EST',
      offset: -5,
    },
  ];

  const DAYS_OF_WEEK = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];

  const HOURS = Array.from({ length: 24 }, (_, i) => i + 8);

  let mouseStatus: MouseStatus = { isDown: false, fill: undefined };
  let selectedHours: Record<BlockId, boolean> = {};
  $: isSelected = (dayIndex: number, hour: number) =>
    selectedHours[`day-${dayIndex}-hour-${hour}`];
  function toggleHour(dayIndex: number, hour: number, toggle?: boolean) {
    const blockId: BlockId = `day-${dayIndex}-hour-${hour}`;
    selectedHours = {
      ...selectedHours,
      [blockId]: toggle ?? !selectedHours[blockId],
    };
  }

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
    {#each timeZones as timeZone, i}
      <div class="hour-header">
        {timeZone.name}

        <!-- "Add" button positioned to right -->
        {#if i === timeZones.length - 1}
          <button
            class="add-time"
            on:click={() => {
              timeZones = [
                ...timeZones,
                {
                  name: 'GMT',
                  offset: 0,
                },
              ];
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
      {#each timeZones as timeZone}
        <div class={`hour-header ${getHourType(hour + timeZone.offset)}`}>
          {displayHour(hour + timeZone.offset)}
          {timeZone.name}
        </div>
      {/each}

      {#each DAYS_OF_WEEK as _, dayIndex}
        <div
          class={`time-slot ${isSelected(dayIndex, hour) ? 'selected' : ''}`}
          on:mousedown|self|preventDefault={() => {
            mouseStatus = {
              isDown: true,
              fill: !isSelected(dayIndex, hour),
            };
            toggleHour(dayIndex, hour, mouseStatus.fill);
          }}
          on:mouseover={() =>
            mouseStatus.isDown && toggleHour(dayIndex, hour, mouseStatus.fill)}
          on:focus={() => toggleHour(dayIndex, hour, true)}
          on:contextmenu|self|preventDefault={() => null}
          role="option"
          tabindex="0"
          aria-selected={isSelected(dayIndex, hour)}
        ></div>
      {/each}
    {/each}
  </div>
</div>

<svelte:document
  on:mouseup={() => (mouseStatus = { isDown: false, fill: undefined })}
/>

<style>
  .calendar {
    display: grid;
    grid-gap: 1px;
    text-align: center;
    margin: auto;
  }

  .hour-header,
  .day-header {
    position: relative;
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

  .time-slot {
    padding: 10px;
    border: 1px solid #bdc3c7;
    background-color: #ecf0f1;
    cursor: pointer;
    min-height: 50px;
    /* Adjust the height of the time slots */
  }

  .time-slot.selected {
    background-color: #3498db;
    color: #ffffff;
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
