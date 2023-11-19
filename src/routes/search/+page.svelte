<script lang="ts">
  import { goto } from "$app/navigation";
  // import { goto, invalidateAll } from "$app/navigation";
  import { ArrowDown, ArrowRight, ArrowUp, Bookmark, Dices, Home } from "lucide-svelte";
  import { depth, path, addItem, focus, book } from "$lib/store";
  import { useCompletion } from 'ai/svelte';
  import { onMount } from "svelte";
  import BookBar from "$lib/components/BookBar.svelte";
  import Loading from "$lib/components/Loading.svelte";
  import LoadingDots from '$lib/components/LoadingDots.svelte';


  const {
		input: promptInput,
		handleSubmit: handlePromptSubmit,
		completion: promptCompletion,
		isLoading: responseIsLoading
	} = useCompletion({ api: '/api/subtopics' });

  const {
		input: promptInput1,
		handleSubmit: handlePromptSubmit1,
		completion: promptCompletion1,
		isLoading: responseIsLoading1
	} = useCompletion({ api: '/api/shuffle' });


  let stage: number;
  $promptInput = JSON.stringify($path);
  
  let pastTopics: any = [];
  let topics: any = ["loading", "loading", "loading", "loading"];
  let shuffle: boolean = false;


  $: {
		if (!$responseIsLoading && $promptCompletion !== '' && !shuffle) {
			// completeEdit($promptCompletion);
      // console.log($promptCompletion);	
      topics = JSON.parse($promptCompletion);
      pastTopics = [ ...pastTopics, topics ];
      console.log(topics);
      stage=2
		}

    if (!$responseIsLoading1 && $promptCompletion1 !== '') {
			// completeEdit($promptCompletion);
      // console.log($promptCompletion);	
      topics = JSON.parse($promptCompletion1);
      pastTopics = [ ...pastTopics, topics ];
      console.log(topics);
      stage=2;
		}
	}

  onMount(() => {
    stage=1;
    const syntheticEvent = new Event('submit');
    handlePromptSubmit(syntheticEvent);
  });

  function reloadPage(){
    location.reload();
  }

  function handlePath(i: number){
    $path = $path.slice(0, i + 1);
    $depth = i+1;
    reloadPage();
  }

  function handleShuffle(){
    shuffle=true;
    console.log(pastTopics);
    stage=1
    topics=["shuffling", "shuffling", "shuffling", "shuffling"];
    const syntheticEvent = new Event('submit');
    let prompt = ("Provide four subdivisions of the subject indicated in " + JSON.stringify($path) + " AND DO NOT MENTION " + pastTopics);
    $promptInput1 = prompt;
    handlePromptSubmit1(syntheticEvent);

  }

  let bookbar=false;

</script>

<div class="flex flex-col h-screen bg-background">
  
  {#if bookbar}
    <div class="absolute top-[50%] -translate-y-[50%] right-0 z-50">
      <BookBar bookbar={bookbar}/>
    </div>
  {/if}

  <div class="grid grid-cols-10 place-items-center w-full h-32 bg-secondary z-30 px-32">
    <button on:click={()=>{goto('/')}} class="text-primary scale-[2] hover:text-background transition-colors durtaion-200 ease-in-out"><Home /></button>
    <div class="col-span-8 flex flex-col place-items-center text-primary gap-2">
      <h1>
        {#if $depth === 1}
          <span class="text-3xl">You are {$depth} step </span>
          {:else}
          <span class="text-3xl">You are {$depth} steps </span>
        {/if}
        <span class="pl-2 text-4xl font-bold italic">Down the Rabbit Hole</span></h1>
    </div>
    <button on:click={()=>{bookbar=!bookbar}} class="text-primary scale-[2] hover:text-background transition-colors durtaion-200 ease-in-out"><Bookmark /></button>
  </div>
  <div class="w-full border-b-2 border-secondary py-2 h-16">
    <div class="text-2xl flex w-fit mx-auto text-secondary">
      {#each $path as part, i}
        <button on:click={()=>{handlePath(i)}} class="hover:font-bold">{part.toLowerCase()}</button><span>/</span>
      {/each}
    </div>
  </div>
  
  <div class="grid grid-rows-2 grid-cols-2 place-items-center h-full relative">
    {#each topics as topic}
      <div class="bg-primary rounded-2xl w-[80%] h-[80%] text-center flex flex-col border-2 border-secondary">
        {#if topic.length > 12}
        <button on:click={()=>{addItem(topic); depth.update(val=>val+=1); reloadPage()}} class="text-6xl font-bold text-secondary flex-1 grid place-items-center">
          {topic.toLowerCase()}
        </button>
        {:else}
          {#if stage===1}
            <button on:click={()=>{addItem(topic); depth.update(val=>val+=1); reloadPage()}} class="text-4xl font-bold text-secondary flex-1 grid place-items-center">
              <div class="flex place-items-center gap-x-2">
                <Loading/>{topic.toLowerCase()}<LoadingDots/>
              </div>
            </button>
          {:else}
            <button on:click={()=>{addItem(topic); depth.update(val=>val+=1); reloadPage()}} class="text-6xl font-bold text-secondary flex-1 grid place-items-center">
              {topic.toLowerCase()}
            </button>
          {/if}
        {/if}
        {#if $depth === 1}
          <div class="text-secondary flex mx-auto gap-2 scale-90">
            <ArrowUp/> click here to see more subdivisions <ArrowUp/>
          </div>
        {/if}
        <button on:click={()=>{focus.set(topic); goto('/learn')}} class="bg-secondary text-primary h-20 grid place-items-center flex-none w-full rounded-b-xl">
          {#if $depth === 1}
            <div class="text-white flex mx-auto mb-2 gap-2 scale-90">
              <ArrowDown/> click here to go into depth <ArrowDown/>
            </div>
          {/if}
          <div class="text-4xl font-bold">
            Learn More
          </div>
        </button>
      </div>
      
    {/each}

    {#if $depth >= 5}
      <div class="flex gap-x-2 absolute text-secondary w-fit font-bold top-[50%] left-[10%] -translate-y-[50%]">
        At these depths, you might have to shuffle a bit <ArrowRight/>
      </div>
    {/if}

    <button on:click={()=>{handleShuffle()}} class="hover:bg-secondary hover:text-background transition-color duration-200 ease-in-out flex gap-x-4 absolute text-secondary w-32 font-bold border-2 p-2 px-4 border-secondary rounded-xl top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]">
      <span>shuffle</span> <Dices class="scale-150"/>
    </button>
  </div>

</div>
