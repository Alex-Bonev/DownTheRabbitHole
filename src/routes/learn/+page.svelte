<script lang="ts">
  import { goto } from "$app/navigation";
  import { path, focus, book, addBook, removeBook} from "$lib/store";
  import { useCompletion } from 'ai/svelte';
  import { Bookmark, BookmarkCheck, Home } from "lucide-svelte";
  import {marked} from 'marked';
  import { onMount } from "svelte";

  const {
    input: promptInput,
    handleSubmit: handlePromptSubmit,
    completion: promptCompletion,
    isLoading: responseIsLoading
  } = useCompletion({ api: '/api/wiki/overview' });

  const {
    input: promptInput1,
    handleSubmit: handlePromptSubmit1,
    completion: promptCompletion1,
    isLoading: responseIsLoading1
  } = useCompletion({ api: '/api/wiki/tldr' });

  let points: any = [];
  let renderedMarkdown: string = '';

  let firstTopic = ($path[0]);
  let lastTopic = ($path[$path.length-1]);

  $promptInput = $focus + " from the field of " + lastTopic + " in the context of " + firstTopic;
  $promptInput1 = $focus + " from the field of " + lastTopic + " in the context of " + firstTopic;

  onMount(() => {
    const syntheticEvent = new Event('submit');
    handlePromptSubmit(syntheticEvent);
    handlePromptSubmit1(syntheticEvent);
  });

  $: {
    if (!$responseIsLoading1 && $promptCompletion1 !== '') {
      points = JSON.parse($promptCompletion1);
    }

    renderedMarkdown = addTailwindClasses(renderMarkdown($promptCompletion));
  }

  function renderMarkdown(markdown: string): string {
    // Convert Markdown to HTML using the marked library
    return marked(markdown);
  }

  function addTailwindClasses(html: string): string {

    const classNames = {
      'h1': 'text-4xl font-bold text-secondary mb-4',
      'h2': 'text-3xl font-bold text-secondary mb-3',
      'h3': 'text-2xl font-bold text-secondary mb-2',
      'p': 'text-xl text-secondary mb-4',
      'li': 'text-lg text-secondary mb-4',
      'code': 'font-mono text-secondary',
    };

    Object.keys(classNames).forEach(tag => {
      const regex = new RegExp(`<${tag}>`, 'g');
      //@ts-ignore
      html = html.replace(regex, `<${tag} class="${classNames[tag]}">`);
    });

    return html;
  }

  let bookmarked = false;

  function handleBook(focus: string){
    if(bookmarked){
      removeBook(focus);
      bookmarked=false;
    } else {
      addBook(focus);
      bookmarked=true;
    }
    console.log($book)
  }

  console.log($focus);
</script>

<style>
	.hideScroll::-webkit-scrollbar { display: none; }
	.hidescroll {
  	-ms-overflow-style: none;  /* IE and Edge */
  	scrollbar-width: none;     /* Firefox */
	}
	#scrollingBlock {
		border: 2px solid black;
		/*box-shadow: 10px 5px 5px red;*/
		overflow-y: scroll;
	}
</style>

<main class="hideScroll hidescroll w-full h-screen bg-primary" id="scrollingBlock">
  <div class="w-full h-12 flex justify-evenly place-items-center py-2 border-b-2 border-secondary text-secondary">
    <button on:click={()=>{goto('/')}} class="border-r-2 border-secondary w-96 p-3 hover:bg-secondary hover:text-primary transition-colors duration-200 ease-in-out">
      <div class="mx-auto w-2">
        <Home/>
      </div>
    </button>
    <div class="text-3xl font-bold italic flex-1 grid place-items-center">Down the Rabbit Hole</div>
    <button on:click={()=>{handleBook($focus + " in " + $path[0])}} class="border-l-2 border-secondary w-96 p-3 hover:bg-secondary hover:text-primary transition-colors duration-200 ease-in-out">
      {#if !bookmarked}
        <div class="mx-auto w-2">
          <Bookmark/> 
        </div>
      {:else}
        <div class="mx-auto w-2">
          <BookmarkCheck/> 
        </div>

      {/if}
    </button>
  </div>
  <div class="flex flex-col bg-primary px-20">
    <div class="text-secondary flex gap-1 p-2 place-items-baseline border-b-2 border-secondary m-2">
      <div class="text-xl">
        {#each $path as part, i}
          <button class="mr-1">{part.toLowerCase()}</button><span>/</span>
        {/each}
      </div>
      <div class="text-8xl font-bold">
        {$focus}
      </div> 
    </div>
    {@html renderedMarkdown}
    {#if (!$responseIsLoading1 && $promptCompletion1 !== '')}
      <div class=" pt-2 mt-2 border-t-2 border-secondary text-5xl font-bold text-secondary">10 important facts</div>
      {#each points as point, i}
        <div class="flex items-center text-lg text-secondary mb-2">
          <span class="mr-2">{i+1}.</span>
          <span>{point}</span>
        </div>
      {/each}
    {/if}
    <div class="h-px pb-10"></div>
  </div>
</main>
