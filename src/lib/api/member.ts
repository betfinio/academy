import { PASS_ADDRESS } from '@/src/globals.ts';
import { PassABI } from '@betfinio/abi';
import { type Config, readContract } from '@wagmi/core';
import type { Address } from 'viem';

export const fetchAddressByToken = async (token: bigint, config: Config): Promise<Address> => {
	return readContract(config, {
		abi: PassABI,
		address: PASS_ADDRESS,
		functionName: 'ownerOf',
		args: [token],
	});
};
