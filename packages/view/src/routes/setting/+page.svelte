<script lang="ts">
  import { cn } from "$lib/utils/cn";
  import { Button, Input, ListGroup, ListGroupItem } from "sveltestrap";
  import { onMount } from "svelte";

  let jiraUrl = "";

  let recentlyList: HistoryType[] = [];

  let selectedJira = "";

  onMount(async () => {
    recentlyList = await window.api.getHistories();
  });
</script>

<title>Setting</title>

<div class="box">
  <Input
    type="text"
    bind:value={jiraUrl}
    placeholder="https://*.atlassian.net/"
  />
  <Button
    color="primary"
    on:click={() => {
      window.api.openJira(jiraUrl);
    }}
  >
    Connect
  </Button>
</div>

<div class="list ">
  <ListGroup>
    <ListGroupItem disabled>Recently Visited Jira</ListGroupItem>
    <div class="list-content">
      {#each recentlyList as item}
        <ListGroupItem
          class={cn("item", selectedJira !== item.url && "item-hover")}
          on:click={() => {
            if (selectedJira === item.url) {
              window.api.openJira(item.url);
              return;
            }
            selectedJira = item.url;
          }}
          active={selectedJira === item.url}>{item.name}</ListGroupItem
        >
      {/each}
    </div>
  </ListGroup>
</div>

<style>
  .box {
    padding: 24px;
    display: flex;
    gap: 12px;
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

  :global(.item):first-child {
    border-top-width: 0;
  }

  :global(.item-hover):hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
</style>
