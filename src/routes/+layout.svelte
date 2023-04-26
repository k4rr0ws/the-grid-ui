<script>
  import "../app.postcss";
  import { configureWagmi, wagmiLoaded } from 'svelte-wagmi'
  import { web3Modal, connected, connection, disconnectWagmi, signerAddress } from 'svelte-wagmi'
  import { onMount } from 'svelte'
  import { abbrAddress } from '$lib/utils'
  import IMG_LOGO from '$lib/assets/logo.png'

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
    <a href="/" alt="The Grid Project" class="hidden md:block">
      <img src={IMG_LOGO} class="w-96" alt="The Grid" />
    </a>
  </div>
  <div class="flex-none">
    {#if $connected}
      <button on:click={disconnect} class="btn bg-green-500 hover:bg-green-600 text-white mx-4 my-2 text-sm">{abbrAddress($signerAddress)}</button>
    {:else}
      <button on:click={connect} class="btn bg-green-500 hover:bg-green-600 mx-4 my-2 text-sm text-white w-32">Connect</button>
    {/if}
  </div>
</div>
<div class="drawer drawer-mobile">
  <input id="my-drawer" type="checkbox" class="drawer-toggle" bind:checked={drawerOpen} />
  <div class="drawer-content flex flex-col items-center">
    <div class="p-4 md:p-8">
      <slot />
    </div>
  </div> 
  <div class="drawer-side">
    <label for="my-drawer" class="drawer-overlay"></label>
    <ul class="menu menu-compact p-4 w-80 bg-[#0e0f14] ">
      <li class="pixelFont mt-8 text-md font-semibold border-b-4 border-green-500 text-neutral-400 pb-2 mb-2 hover:bg-none uppercase">Core</li>
      <li><a href="/" class="p-2 hover:bg-green-500 hover:text-black">The Grid</a></li>
      <li><a href="/story/characters" class="p-2 hover:bg-green-500 hover:text-black">Characters</a></li>
      <li class="pixelFont mt-8 text-md font-semibold border-b-4 border-green-500 text-neutral-400 pb-2 mb-2 hover:bg-none uppercase">Character</li>
      <li><a href="/mint" class="p-2 hover:bg-green-500 hover:text-black">Creation Station</a></li>
      <li><a href="/characters" class="p-2 hover:bg-green-500 hover:text-black">My Characters</a></li>
      <li class="pixelFont text-md font-semibold border-b-4 border-green-500 text-neutral-400 pb-2 mb-2 mt-8 hover:bg-none uppercase">$GRID</li>
      <li><a href="/cyberlock" class="p-2 hover:bg-green-500 hover:text-black">CyberLock Staking</a></li>
      <li><a href="/liquidity-provision" class="p-2 hover:bg-green-500 hover:text-black">Liquidity Provision</a></li>
      <li class="pixelFont text-md font-semibold border-b-4 border-green-500 text-neutral-400 pb-2 mb-2 mt-8 hover:bg-none uppercase">Communications</li>
      <li><a href="https://discord.com" class="p-2 hover:bg-green-500 hover:text-black">Discord</a></li>
      <li class="pixelFont text-md font-semibold border-b-4 border-green-500 text-neutral-400 pb-2 mb-2 mt-8 hover:bg-none uppercase">Propoganda</li>
      <li><a class="p-2 hover:bg-green-500 hover:text-black">Twitter</a></li>
      <li><a class="p-2 hover:bg-green-500 hover:text-black">Substack</a></li>
    </ul>
  
  </div>
</div>

