<script lang="ts">
  import { cn } from "$lib/utils/cn";
  import { Button, Input, ListGroup, ListGroupItem } from "sveltestrap";

  let jiraUrl = "";

  let recentlyList = [
    {
      name: "Jira 1",
      url: "https://jira1.atlassian.net/",
    },
  ];

  let selectedJira = "";
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
    }}>Connect</Button
  >
</div>

<div class="list ">
  <ListGroup>
    <ListGroupItem disabled>Recently Visited Jira</ListGroupItem>
    <div class="list-content">
      {#each recentlyList as item}
        <ListGroupItem
          class={cn("item", selectedJira !== item.name && "item-hover")}
          on:click={() => (selectedJira = item.name)}
          active={selectedJira === item.name}>{item.name}</ListGroupItem
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
    border-bottom: 1px solid rgba(0, 0, 0, 0.125);
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
    height: 200px;
    overflow-y: auto;
  }

  :global(.item) {
    cursor: pointer;
    border: 1px solid rgba(0, 0, 0, 0.125);
  }

  :global(.item):first-child {
    border-top: 0;
  }

  :global(.item):last-child {
    border-bottom: 0;
  }

  :global(.item-hover):hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
</style>
