<script lang="ts">
  import Calendar from './lib/Calendar.svelte';
  import ModeButton from './lib/ModeButton.svelte';
  import { mode, allCells } from './lib/stores';
  import { maxAttendees } from './lib/utils';
</script>

<main>
  <div class="intro">
    <h1>Please fill in your availability below!</h1>

    <p>
      You have been invited to a meeting by <strong>Elena Glassman</strong> with
      the meeting subject <strong>CS178 Final Project</strong>. There are
      <strong>{maxAttendees}</strong> other invitees. 8 attendees are based in 
      <strong>EST</strong> and 2 are based in <strong>PST</strong>. Happy meeting!
    </p>

    <ModeButton />

    <div style={`opacity: ${$mode === 'confirmation' ? 1 : 0}`}>
      <p>
        Slide left until you <em>wouldn't attend</em> with that many people.
      </p>
      <button type="submit" disabled={$mode !== 'confirmation'}>
        Submit
      </button>
    </div>
  </div>

  <Calendar />
</main>

<style>
  .intro {
    text-align: center;
    margin-bottom: 4em;
  }

  .intro h1 {
    margin-bottom: 0.5em;
    color: #2c3e50;
  }

  .intro p {
    max-width: 24em;
    margin-left: auto;
    margin-right: auto;
    line-height: 1.6;
    color: #34495e;
  }
</style>
