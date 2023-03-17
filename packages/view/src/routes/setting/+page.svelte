<script lang="ts">
  import { cn } from "$lib/utils/cn";
  import { Button, Input, ListGroup, ListGroupItem } from "sveltestrap";
  import { onDestroy, onMount } from "svelte";
  import { noop } from "svelte/internal";

  let jiraUrl = "";

  let histories: HistoryType[] = [];

  let selectedJira = "";

  let clean = noop;

  onMount(async () => {
    clean = window.api.onAlert((message) => alert(message));
    histories = await window.api.getHistories();
  });

  onDestroy(() => {
    clean();
  });
</script>

<div class="container">
  <title>Setting</title>

  <form class="box" on:submit={() => window.api.openJira(jiraUrl)}>
    <Input
      type="text"
      bind:value={jiraUrl}
      placeholder="https://*.atlassian.net"
    />
    <Button type="submit" color="primary">Connect</Button>
  </form>

  <div class="list ">
    <ListGroup>
      <ListGroupItem class="list-title">
        <p>Recently Visited Jira</p>
        <Button
          class="clickable"
          on:click={async () => {
            await window.api.clearHistories();
            histories = await window.api.getHistories();
          }}>Clear</Button
        >
      </ListGroupItem>
      <div class="list-content">
        {#each histories as history}
          <ListGroupItem
            class={cn("item", selectedJira !== history.url && "item-hover")}
            on:click={() => {
              if (selectedJira === history.url) {
                window.api.openJira(history.url);
                return;
              }
              selectedJira = history.url;
              jiraUrl = history.url;
            }}
            active={selectedJira === history.url}>{history.name}</ListGroupItem
          >
        {/each}
      </div>
    </ListGroup>
  </div>
</div>

<style>
  .container {
    user-select: none;
  }

  .box {
    padding: 24px;
    display: flex;
    gap: 12px;
  }

  p {
    margin: 0;
  }

  .list {
    padding: 0px 24px;
  }

  .list-content {
    border: 1px solid rgba(0, 0, 0, 0.125);
    border-top: 0px;
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
    height: 200px;
    overflow-y: auto;
  }

  :global(.item) {
    cursor: pointer;
    border-radius: 0px !important;
    border-left-width: 0 !important;
    border-right-width: 0 !important;
    border: 1px solid rgba(0, 0, 0, 0.125);
  }

  :global(.list-title) {
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: #6c757d;
  }

  :global(.item):first-child {
    border-top-width: 0;
  }

  :global(.item-hover):hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
</style>
