<script lang="ts">
  import { goto } from "$app/navigation";
  import { book, focus, path, removeBook } from "$lib/store";
  import { Dot, X } from "lucide-svelte";

  export let bookbar:boolean;

  function handleRedirect(item: string){
    let split = item.split(" ")
    focus.set(split[0])
    path.set([split[split.length-1]]);
    goto('/learn')
  }

</script>

{#if bookbar}
  <div class="h-[80vh] bg-primary w-96 rounded-l-2xl flex flex-col justify-between border-2 border-secondary">
    <div class="flex-1 p-2">
      <h1 class="mx-auto w-fit text-4xl font-bold text-secondary pb-2 mb-2 border-b-2 border-secondary px-8">Bookmarks</h1>
      {#if $book.length > 0}
      {#each $book as item}
        <div class="flex px-10 justify-between text-secondary">
          <button on:click={()=>{handleRedirect(item)}} class="flex text-lg place-items-center hover:font-bold">
            <Dot/> {item}
          </button>
          <button on:click={()=>{removeBook(item)}}>
            <X />
          </button>
        </div>
      {/each}
      {:else}
        <div class="px-10 text-secondary">
          Looks like you haven't bookmarked anything yet. Try pressing the icon whenever you choose to learn more about a subject!
        </div>
      {/if}
    </div>
    <button on:click={()=>{bookbar=false}} class="bg-background text-secondary rounded-bl-2xl text-bold h-12 border-t-2 border-secondary flex-none grid place-items-center font-bold text-2xl">Close</button>
  </div>
{/if}