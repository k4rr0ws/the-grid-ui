import { contracts } from '$lib/config'
import { ethers } from 'ethers'
import { prepareWriteContract, writeContract, waitForTransaction, readContract } from '@wagmi/core'
import { connected, signerAddress } from 'svelte-wagmi'

export const allowance = async (owner, spender) => {
    try {
        const allowed = await readContract({
            address: contracts.token.address,
            abi: contracts.token.abi,
            functionName: 'allowance',
            args: [owner, spender]
        })
        return allowed
    } catch (error) {
        console.log(error)
        return false
    }
}

export const approve = async(spender, amount) => {
    try {
        const config = await prepareWriteContract({
            address: contracts.token.address,
            abi: contracts.token.abi,
            functionName: 'approve',
            args: [spender, amount]
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

export const balanceOf = async (account, token=contracts.token.address) => {
    try {
        const balance = await readContract({
            address: token,
            abi: contracts.token.abi,
            functionName: 'balanceOf',
            args: [account]
        })
        return ethers.utils.formatEther(balance)
    } catch (error) {
        console.log(error)
        return false
    }
}
