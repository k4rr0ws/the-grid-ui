import { contracts } from '$lib/config'
import { ethers } from 'ethers'
import { prepareWriteContract, writeContract, waitForTransaction, readContract } from '@wagmi/core'
import { connected, signerAddress } from 'svelte-wagmi'
