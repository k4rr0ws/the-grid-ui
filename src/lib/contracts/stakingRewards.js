import { contracts } from '$lib/config'
import { ethers } from 'ethers'
import { prepareWriteContract, writeContract, waitForTransaction, readContract } from '@wagmi/core'
import { connected, signerAddress } from 'svelte-wagmi'


export const stake = async(amount) => {
    try {
        const config = await prepareWriteContract({
            address: contracts.stakingRewards.address,
            abi: contracts.stakingRewards.abi,
            functionName: 'stake',
            args: [amount]
        })
        const { hash } = await writeContract(config)
        const data = await waitForTransaction({ 
            hash 
        })
        return data
    } catch (error) {
        console.log(error)
        return false
    }
}

export const withdraw = async(amount) => {
    try {
        const config = await prepareWriteContract({
            address: contracts.stakingRewards.address,
            abi: contracts.stakingRewards.abi,
            functionName: 'withdraw',
            args: [amount]
        })
        const { hash } = await writeContract(config)
        const data = await waitForTransaction({ 
            hash 
        })
        return data
    } catch (error) {
        console.log(error)
        return false
    }
}

export const stakedBalance = async(account) => {
    try {
        const balance = await readContract({
            address: contracts.stakingRewards.address,
            abi: contracts.stakingRewards.abi,
            functionName: 'balanceOf',
            args: [account]
        })
        return ethers.utils.formatEther(balance)
    } catch (error) {
        console.log(error)
        return false
    }
}

export const earned = async(account) => {
    try {
        const balance = await readContract({
            address: contracts.stakingRewards.address,
            abi: contracts.stakingRewards.abi,
            functionName: 'earned',
            args: [account]
        })
        return ethers.utils.formatEther(balance)
    } catch (error) {
        console.log(error)
        return false
    }
}