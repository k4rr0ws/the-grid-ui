import { contracts } from '$lib/config'
import { ethers } from 'ethers'
import { prepareWriteContract, writeContract, waitForTransaction, readContract } from '@wagmi/core'
import { connected, signerAddress } from 'svelte-wagmi'

export const mint = async(price, amount) => {
    try {
        const config = await prepareWriteContract({
            address: contracts.nft.address,
            abi: contracts.nft.abi,
            functionName: 'mint',
            args: [amount],
            overrides: {
                    value: ethers.utils.parseEther(String(price * amount)),
            }
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

export const setApprovalForAll = async(operator, approved) => {
    try {
        const config = await prepareWriteContract({
            address: contracts.nft.address,
            abi: contracts.nft.abi,
            functionName: 'setApprovalForAll',
            args: [operator, approved]
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

export const isApprovedForAll = async (owner, operator) => {
    try {
        const approved = await readContract({
            address: contracts.nft.address,
            abi: contracts.nft.abi,
            functionName: 'isApprovedForAll',
            args: [owner, operator]
        })
        return Boolean(approved)
    } catch (error) {
        console.log(error)
        return false
    }
}

export const walletOfOwner = async(address) => {
    try {
        const owned = await readContract({
            address: contracts.nft.address,
            abi: contracts.nft.abi,
            functionName: 'walletOfOwner',
            args: [address]
        })
        if (owned.length > 0) {
            return owned
        }
        return false
    } catch (error) {
        console.log(error)
        return false
    }
}