<script>
    import { connected, signerAddress } from 'svelte-wagmi'
    import { onMount } from 'svelte'
    import { allowance, approve, balanceOf } from '$lib/contracts/token'
    import { stake, stakedBalance, earned, withdraw } from '$lib/contracts/stakingRewards'
    import { config, contracts } from '$lib/config'
    import { NotConnected } from '$lib/components'
    import { ethers } from 'ethers'
    import { toFixedNoRounding } from '$lib/utils'

    let staked = 0
    let unstaked = 0
    let showApprove = false
    let earnings = 0
    let balance = 0
    let stakeInput
    let unstakeInput

    const updateBalances = async() => {
        balance = await balanceOf($signerAddress)
        unstaked = await balanceOf($signerAddress)
        staked = await stakedBalance($signerAddress)
        earnings = await earned($signerAddress)
    }

    const updateIsApproved = async() => {
        let allow = await allowance($signerAddress, contracts.stakingRewards.address)
        if (Number(allow) === 0) {
            showApprove = true
        } else {
            showApprove = false
        }
    }

    const onApproveClick = async() => {
        await approve(contracts.stakingRewards.address, ethers.constants.MaxInt256)
        updateIsApproved()
    }

    const onStakeClick = async() => {
        stakeInput = toFixedNoRounding(stakeInput)
        let amount = ethers.utils.parseEther(stakeInput);
        await stake(amount)
        updateBalances()
    }

    const onUnstakeClick = async() => {
        unstakeInput = toFixedNoRounding(unstakeInput)
        let amount = ethers.utils.parseEther(unstakeInput);
        await withdraw(amount)
        updateBalances()
    }

    onMount(()=>{
        updateIsApproved()
        updateBalances()
    })
</script>

<svelte:head>
    <title>The Grid - Liquidity Provision</title>
</svelte:head>

<div class="bg-[#0e0f14] rounded-lg w-full p-6 mb-6">
    <p>
        As you enter The Grid's Liquidity Provision centre, you're greeted with a bustling marketplace, 
        filled with traders, investors, and curious onlookers. In the center of the room, you see a large, 
        glowing pool of GRID currency.
    </p>
    <p class="mt-6">
        You feel a sense of excitement and possibility as you approach the pool, 
        knowing that by providing liquidity, you can earn GRID rewards and contribute to the growth of 
        The Grid's ecosystem. You place your liquidity into the pool, and watch as the trading volume and liquidity depth of the GRID currency increase. 
        You feel proud to be a part of this thriving community, where everyone benefits from each other's contributions. 
    </p>
</div>

<div class="bg-[#0e0f14] rounded-lg w-full p-4 mb-6">
    <div class="grid grid-cols-2 gap-4 mb-4">
        <div class="bg-neutral-800 p-4 rounded-lg flex flex-col shadow-md">
            <h3 class="text-xl mb-6">Staked LP</h3>
            <p class="text-xl tracking-tight">{staked}</p>
        </div>
        <div class="bg-neutral-800 p-4 rounded-lg flex flex-col shadow-md">
            <h3 class="text-xl mb-6">Unstaked LP</h3>
            <p class="text-xl tracking-tight">{unstaked}</p>
        </div>
    </div>

    <div class="grid grid-cols-2 gap-4 text-left">
        <!-- Stake -->
        <div id="stake" class="bg-neutral-800 p-4 rounded-lg flex flex-col shadow-md">
          <h2 class="text-2xl mb-4">Stake</h2>
          <div>
                <input type="text" class="w-full bg-neutral-100 text-2xl p-1 focus:outline-none rounded" bind:value={stakeInput} />
          </div>
          <div class="mt-2">
                {#if showApprove}
                  <button on:click={onApproveClick} class="text-white bg-green-500 hover:bg-pink-500 font-semibold p-4 w-full rounded">Approve</button>
                {:else}
                <div class="form-control">
                    <div class="input-group">
                    <button on:click={onStakeClick} class="bg-green-500 hover:bg-pink-500 text-white font-semibold p-4 rounded w-full">Stake</button>
                    <button on:click={() => stakeInput = unstaked} class="bg-green-600 hover:bg-pink-500 text-white uppercase font-semibold p-4 rounded">Max</button>
                    </div>
                </div>
                {/if}
          </div>
        </div>
        <!-- Unstake -->
        <div id="unstake" class="bg-neutral-800 p-4 rounded-lg flex flex-col shadow-md">
          <h2 class="text-2xl mb-4">Unstake</h2>
          <div>
            <input type="text" class="w-full bg-neutral-100 text-2xl p-1 focus:outline-none" bind:value={unstakeInput} />
          </div>
          <div class="mt-2">
            <div class="form-control">
                <div class="input-group">
                <button on:click={onUnstakeClick} class="bg-green-500 hover:bg-pink-500 text-white font-semibold p-4 rounded w-full">Unstake</button>
                <button on:click={() => unstakeInput = staked} class="bg-green-600 hover:bg-pink-500 text-white uppercase font-semibold p-4 rounded">Max</button>
                </div>
            </div>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-4 gap-4 mt-4">
        <div class="bg-neutral-800 p-4 rounded-lg flex flex-col shadow-md col-span-4">
            <h3 class="text-2xl mb-6">Earnings</h3>
            <p class="text-xl tracking-tight">{earnings}</p>
          </div>
      <div class="bg-neutral-800 p-4 rounded-lg flex flex-col shadow-md col-span-2">
        <button class="bg-green-500 hover:bg-pink-500 uppercase text-md font-semibold p-4 rounded text-white">Add Liquidity</button>
      </div>
      <div class="bg-neutral-800 p-4 rounded-lg flex flex-col shadow-md col-span-2">
        <button class="bg-green-500 hover:bg-pink-500 uppercase text-md font-semibold p-4 rounded text-white">Claim Earnings</button>
      </div>
      <div class="bg-neutral-800 p-4 rounded-lg flex flex-col shadow-md col-span-4">
            <h3 class="text-2xl mb-6">Your Balance</h3>
            <p class="text-xl tracking-tight">{balance}</p>
        </div>
  </div>
</div>