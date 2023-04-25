<script>
    import { connected, signerAddress } from 'svelte-wagmi'
    import { onMount } from 'svelte'
    import { mint } from '$lib/contracts/nft'
    import { config } from '$lib/config'

    let price = config.price
    let amount;
    let amounts = [2,3,4,5,6,7,8,9,10]

    const onMintPressed = async() => {
        mint(price, amount)
    }
</script>

{#if !$connected}
<div class="alert shadow-lg mb-8 text-white">
    <div>
      <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
      <span>Error! You're not yet connected to The Grid.</span>
    </div>
  </div>
{/if}

<div class="md:flex md:flex-cols">
    <div class="pixelFont text-sm bg-[#0e0f14] rounded-lg mx-auto p-12 mb-4 md:mb-0 md:mr-4 border border-green-500 hover:border-pink-500">
        <h2 class="text-xl mb-8">Mint</h2>
        <div class="form-control">
            <div class="input-group">
            <select class="select select-bordered" bind:value={amount}>
                <option selected>1</option>
                {#each amounts as amt}
                    <option>{amt}</option>
                {/each}
            </select>
            <button class="btn btn-secondary w-32 bg-pink-500 hover:bg-green-500 border-none hover:animate-pulse" on:click={onMintPressed} disabled={!$connected}>Mint</button>
            </div>
        </div>
        <p class="mt-8 text-xs max-w-xs">Each NFT cost 1 AVAX, your character can be staked in CyberLock Staking and will passively generate GRID.</p>
    </div>

    <div class="pixelFont text-xs md:text-sm bg-[#0e0f14] rounded-lg w-full p-12 md:flex-grow">
        <p>
            Welcome to The Grid Creation Station, where you can generate your own NFT and take your place in this mindless society. The Grid algorithm selects the most fitting attributes for your character, creating a unique NFT that represents your presence in The Grid.
        </p>
        <p class="mt-6">
            With your newly generated NFT in hand, you're now ready to explore the vast and exciting world of The Grid. You can stake your NFT to earn GRID, provide liquidity to earn rewards, or complete tasks to earn even more. So come and join us at The Grid Creation Station, and let the algorithmic system create your very own NFT character. Who knows what kind of adventures and challenges lie ahead.
        </p>
    </div>
</div>