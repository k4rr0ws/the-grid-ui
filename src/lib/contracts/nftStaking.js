import { contracts } from '$lib/config'
import { ethers } from 'ethers'
import { prepareWriteContract, writeContract, waitForTransaction, readContract } from '@wagmi/core'
import { connected, signerAddress } from 'svelte-wagmi'

export const stake = async(tokenIds) => {
    let tokens = []

    if (tokenIds.length > 1) {
        tokenIds.forEach((token)=>{
            tokens.push(Number(token))
        })
    } else {
        tokens.push(Number(tokenIds))
    }

    try {
        const config = await prepareWriteContract({
            address: contracts.nftStaking.address,
            abi: contracts.nftStaking.abi,
            functionName: 'stake',
            args: [tokens]
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

export const withdraw = async(tokenIds) => {
    let tokens = []

    if (tokenIds.length > 1) {
        tokenIds.forEach((token)=>{
            tokens.push(token)
        })
    } else {
        tokens.push(tokenIds)
    }

    try {
        const config = await prepareWriteContract({
            address: contracts.nftStaking.address,
            abi: contracts.nftStaking.abi,
            functionName: 'withdraw',
            args: [tokens]
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

export const claimRewards = async() => {
    try {
        const config = await prepareWriteContract({
            address: contracts.nftStaking.address,
            abi: contracts.nftStaking.abi,
            functionName: 'claimRewards',
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

export const userStakeInfo = async (address) => {
    try {
        const info = await readContract({
            address: contracts.nftStaking.address,
            abi: contracts.nftStaking.abi,
            functionName: 'userStakeInfo',
            args: [address]
        })
        return info
    } catch (error) {
        console.log(error)
        return false
    }
}