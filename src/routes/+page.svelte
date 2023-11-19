<script lang="ts">
  import { goto } from '$app/navigation';
  import CurvyBlob from '$lib/components/CurvyBlob.svelte';
  import BookBar from "$lib/components/BookBar.svelte";
  import { path, addItem, depth } from '$lib/store';
  import { ArrowLeft, Bookmark, Dot, Info, X } from 'lucide-svelte';

  let newItem = "";
  let show = false;
  depth.set(0);
  path.set([]);

  let bookbar=false;

</script>

<main class="h-screen overflow-hidden relative">
  <div class="absolute left-16 top-28 rotate-12 text-secondary">
    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-sparkles"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/><path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/></svg>
  </div>
  <div class="absolute right-16 top-8 -rotate-12 text-secondary">
    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-sparkles"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/><path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/></svg>
  </div>
    
  {#if bookbar}
    <div class="absolute top-[50%] -translate-y-[50%] right-0 z-50">
      <BookBar bookbar={bookbar}/>
    </div>
  {/if}

  {#if show}
    <div class="absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] z-50 w-[48rem] h-[30rem] border-secondary border-2 bg-primary rounded-lg">
      <div class="flex justify-between place-items-center border-b-2 border-secondary h-12 w-[48rem] py-4 relative">
        <button on:click={()=>{show=false}} class="px-16 hover:bg-secondary hover:text-primary border-r-2 border-secondary h-12 grid place-items-center transition-colors duration-200 ease-in-out text-secondary">
          <X/>
        </button>
        <div class="px-4 text-3xl font-bold text-secondary mx-auto">
          How to go <span class="italic">Down The Rabbit Hole</span>
        </div>
        
        <!-- <button on:click={()=>{show=false}} class="border-r border-secondary scale-[2] text-secondary absolute left-0 px-8 w-8 grid place-items-center h-6"><X/></button>
        <div class="text-4xl font-bold text-secondary h-12 grid place-items-center absolute right-8">How to go <span class="italic">Down The Rabbit Hole</span></div> -->
      </div>
      <ol class="p-4 text-secondary text-lg">
        <li><span class="font-bold">1. </span>Enter a subject of interest (e.g. math, physics, kinesiology, fairytales, magic, etc.) and press next. Anything works!</li>
        <li><span class="font-bold">2. </span>Click on the field that you would like to delve deeper into!</li>
        <li><span class="font-bold">3. </span>Once you reach a term that you would like to learn more about, press the "Dive In" button to watch a wiki page be generated before your eyes</li>

        <ul class="text-2xl font-bold mt-8">Tips and Tricks:</ul>
          <li class="flex"><Dot/> Make sure to search really broad subjects, so have more space to explore!</li>
          <li class="flex"><Dot/> Pressing on a term in the path will send you back to it!</li>
          <li class="flex"><Dot/> Pressing shuffle will generate new subdivisions when you want more options!</li>
          <li class="flex"><Dot/> If something is taking a while to load, feel free to refresh!</li>
          <li class="flex"><Dot/> You can bookmark pages that are interesting to you!</li>

      </ol>
    </div>
  {/if}

  <div class="flex flex-col h-screen bg-background">
    <div class="w-fit h-32 text-8xl font-bold mt-8 -mb-4 text-secondary mx-auto">
      Down the Rabbit Hole
    </div>
    <div class="w-fit h-32 font-bold mt-0 text-secondary mx-auto">
      <span class="text-4xl">A solo project by Alexander Bonev </span><span class="text-md">(for AliceHacks!!!)</span>
    </div>
    
    <div class="absolute top-[70%] left-[50%] -translate-x-[50%] -translate-y-[50%] h-96">
      <CurvyBlob />  
    </div>
    <div class="absolute top-[57%] left-[50%] -translate-x-[50%] -translate-y-[50%]">
      <form class="flex flex-col">
        <div class="font-bold text-primary text-3xl mx-auto">Submit a Topic</div>
        <input bind:value={newItem} class="outline-none p-2 text-secondary rounded-md text-2xl font-bold" autocomplete="off" name="text" type="text">
      </form>
      <button on:click={()=>{depth.update(depth=>depth+=1); addItem(newItem); goto('/search')}} class="mt-2 grid place-items-center w-full z-20">
        <div class="bg-offwhite border-2 border-secondary font-bold text-secondary p-2 rounded-md text-2xl px-4 z-40">Next</div>
      </button>
    </div>
  </div>

  <button on:click={()=>{show=!show; console.log(show)}} class="flex gap-2 place-items-center border-2 border-secondary font-bold text-xl text-secondary absolute bottom-4 left-4 p-4 rounded-lg hover:bg-secondary hover:text-primary transition-colors duration-200 ease-in-out">
    <Info/>How to use
  </button>
  
  <button on:click={()=>{bookbar=!bookbar}} class="flex gap-2 place-items-center border-2 border-secondary font-bold text-xl text-secondary absolute bottom-4 right-4 p-4 rounded-lg hover:bg-secondary hover:text-primary transition-colors duration-200 ease-in-out">
    <Bookmark/>Bookmarks
  </button>

  <div class="absolute -bottom-8 right-72 w-10 h-48 rotate-12 border-2 border-secondary bg-primary"></div>
  <div class="absolute bottom-32 right-[9.5rem] w-64 h-32 rotate-12 border-2 border-secondary bg-primary">
    <div class="grid place-items-center text-secondary font-bold text-3xl h-full">
      <div class="flex flex-col">
        <div class="flex place-items-center h-16">
          <div class="scale-[2] mr-4"><ArrowLeft/></div>Rabbit Hole
        </div>
        <div class="grid place-items-center h-8 text-lg">
          (A long way down!!)
        </div>
      </div>
    </div>
  </div>

</main>
