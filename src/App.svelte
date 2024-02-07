<script lang="ts">
  import Calendar from './lib/Calendar.svelte';
</script>

<main>
  <div class="intro">
    <h1>Please fill in your availability below!</h1>
    <p>
      You have been invited to a meeting by <strong>Elena Glassman</strong> with
      the meeting subject <strong>CS178 Final Project</strong>. There are
      <strong>5</strong> other invitees. Please indicate your availability below
      as well as the minimum number of attendees who must be present in order for
      you to join the meeting. Happy meeting!
    </p>
  </div>

  <Calendar />
</main>

<style>
  .intro {
    text-align: center;
    margin-bottom: 20px;
  }

  .intro h1 {
    margin-bottom: 0.5em;
    color: #2c3e50;
  }

  .intro p {
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
    line-height: 1.6;
    color: #34495e;
  }
</style>
