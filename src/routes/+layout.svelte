<script>
  import "../app.postcss";
  import { configureWagmi, wagmiLoaded } from 'svelte-wagmi'
  import { web3Modal, connected, connection, disconnectWagmi, signerAddress } from 'svelte-wagmi'
  import { onMount } from 'svelte'
  import { abbrAddress } from '$lib/utils'

  let drawerOpen = false

  onMount(async () => {
		await configureWagmi({
			walletconnect: true,
			walletconnectProjectID: "TheGridProject",
		})
	})

  const connect = async () => {
    if(!$connected) $web3Modal.openModal()
  }

  const disconnect = async() => {
    disconnectWagmi()
  }
</script>

<div class="navbar bg-[#060a0e] border-b-2 border-[#0e0f14]">
  <div class="flex-none md:hidden">
    <button on:click={()=>drawerOpen = !drawerOpen} class="btn btn-square btn-ghost">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-5 h-5 stroke-current"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
    </button>
  </div>
  <div class="flex-1">
    <a href="/" alt="The Grid Project" class="hidden md:block btn btn-ghost normal-case text-2xl pixelFont text-green-400">#Th<span class="text-pink-500 uppercase underline mr-4">e</span>Gr<span class="text-pink-500 overline">id</span></a>
  </div>
  <div class="flex-none">
    {#if $connected}
      <button on:click={disconnect} class="btn btn-secondary mx-4 my-2 text-sm pixelFont">{abbrAddress($signerAddress)}</button>
    {:else}
      <button on:click={connect} class="btn btn-secondary mx-4 my-2 text-sm w-32 pixelFont">Connect</button>
    {/if}
  </div>
</div>
<div class="drawer drawer-mobile">
  <input id="my-drawer" type="checkbox" class="drawer-toggle" bind:checked={drawerOpen} />
  <div class="drawer-content flex flex-col items-center">
    <div class="p-4 md:p-20">
    <slot />
    </div>
  
  </div> 
  <div class="drawer-side">
    <label for="my-drawer" class="drawer-overlay"></label>
    <ul class="menu menu-compact p-4 w-80 bg-[#0e0f14] pixelFont">
      <li class="pixelFont mt-8 text-md font-semibold border-b-4 border-green-500 text-pink-500 pb-2 mb-2 hover:bg-none uppercase">core</li>
      <li><a class="p-2 hover:bg-green-500 hover:text-black">About</a></li>
      <li><a class="p-2 hover:bg-green-500 hover:text-black">The Grid Roadmap</a></li>
      <li class="pixelFont mt-8 text-md font-semibold border-b-4 border-green-500 text-pink-500 pb-2 mb-2 hover:bg-none uppercase">character</li>
      <li><a href="/mint" class="p-2 hover:bg-green-500 hover:text-black">Creation Station</a></li>
      <li><a href="/characters" class="p-2 hover:bg-green-500 hover:text-black">My Characters</a></li>
      <li class="pixelFont text-md font-semibold border-b-4 border-green-500 text-pink-500 pb-2 mb-2 mt-8 hover:bg-none uppercase">$GRID</li>
      <li><a class="p-2 hover:bg-green-500 hover:text-black">Tasks Station</a></li>
      <li><a href="/cyberlock" class="p-2 hover:bg-green-500 hover:text-black">CyberLock Staking</a></li>
      <li><a class="p-2 hover:bg-green-500 hover:text-black">Liquidity Provision</a></li>
      <li><a class="p-2 hover:bg-green-500 hover:text-black">Tokenomics</a></li>
      <li class="pixelFont text-md font-semibold border-b-4 border-green-500 text-pink-500 pb-2 mb-2 mt-8 hover:bg-none uppercase">propoganda</li>
      <li><a class="p-2 hover:bg-green-500 hover:text-black">Twitter</a></li>
      <li><a class="p-2 hover:bg-green-500 hover:text-black">Discord</a></li>
    </ul>
  
  </div>
</div>

