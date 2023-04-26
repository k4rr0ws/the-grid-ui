<script>
    import { connected, signerAddress } from 'svelte-wagmi'
    import { onMount } from 'svelte'
    import { walletOfOwner } from '$lib/contracts/nft'
    import { config } from '$lib/config'
    import { NotConnected } from '$lib/components'

    let nfts = []

    const updateOwnedNFTs = async() => {
        let owned = await walletOfOwner($signerAddress)
        if (owned) {
            nfts = owned
        } else {
            nfts = []
        }
        nfts = nfts
    }

    onMount(() => {
        updateOwnedNFTs()
    })

    
</script>

<svelte:head>
    <title>The Grid - My Characters</title>
</svelte:head>

<div class="bg-[#0e0f14] rounded-lg w-full p-12 mb-6">
    <p>
        You access "My Characters" page, a virtual space that houses all of your unique NFT characters. 
        As you scroll through the list, you see the different characters you've generated, 
        each one with its own unique set of attributes and qualities.
    </p>
    <p class="mt-6">
        You feel a sense of pride as you look at the collection you've built, 
        a testament to your investment in The Grid. You have the ability to transfer your characters to others, 
        adding to the value of The Grid's NFT ecosystem. With a simple click, you can transfer your NFT characters to friends, family, or 
        anyone else who wants to join you in this evolving world.
    </p>
</div>

{#if !$connected}
    <NotConnected />
{:else}
<div class="bg-[#0e0f14] rounded-lg p-12">
    <h2 class="pixelFont text-xl mb-8">My Characters</h2>
    {#if nfts.length > 0}
    <div class="grid grid-cols-1 md:grid-cols-5 gap-2">
        {#each nfts as nft}
            <div class="card card-compact w-64 bg-base-100 shadow-xl">
                <figure><img src="{config.imageBase}{nft}.png" alt="Shoes" /></figure>
                <div class="card-body">
                  <div class="card-actions">
                    <button class="btn btn-primary text-xs bg-green-500 border-none hover:bg-green-600 w-full">Transfer</button>
                  </div>
                </div>
            </div>
        {/each}
    </div>
    {/if}
</div>
{/if}