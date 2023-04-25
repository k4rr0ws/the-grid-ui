import nftABI from '$lib/abi/NFT.json'
import tokenABI from '$lib/abi/Token.json'
import nftStakingABI from '$lib/abi/NFTStaking.json'

export const config = {
    price: 0.05,
    imageBase: 'https://gateway.ipfscdn.io/ipfs/QmT4GH3tqyqsNxv5NmJ6UwcjnfQ6v61dqXufU7BjGJJJvD/'
}

export const contracts = {
    nft: {
        address: '0xA9c360A27b63Fed202803a959485e730f7da88fa',
        abi: nftABI
    },
    token: {
        address: '0xaFe4817A19e492cb885013e6A115667DF40AF060',
        abi: tokenABI
    },
    nftStaking: {
        address: '0x7CD5a6269a2503070657854d70Bef09A680562fC',
        abi: nftStakingABI
    }
}