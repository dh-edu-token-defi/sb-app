import { SequenceMetadataClient } from "@0xsequence/metadata";
import { Keychain, ValidNetwork } from "@daohaus/keychain-utils";

export const SEQUENCE_CHAIN_NAME: Keychain = {
  "0x1": "mainnet",
  "0x5": "goerli",
  "0x64": "gnosis",
  "0x89": "polygon",
  "0xa": "optimism",
  "0xa4b1": "arbitrum",
};

export const fetchNftContractMetadata = async ({
  nftContractAddress,
  chainId,
}: {
  nftContractAddress: string;
  chainId: string;
}) => {
  const sequenceChainName = SEQUENCE_CHAIN_NAME[chainId as ValidNetwork];

  if (!sequenceChainName) {
    throw new Error("Invalid ChainId");
  }

  const metadataClient = new SequenceMetadataClient();

  const contractMetadata = await metadataClient.getContractInfoBatch({
    chainID: sequenceChainName,
    contractAddresses: [nftContractAddress],
  });
  return contractMetadata;
};
