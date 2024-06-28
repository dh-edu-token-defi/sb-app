import "react-multi-carousel/lib/styles.css";

import { useRecords } from "../hooks/useComments";
import { useDHConnect } from "@daohaus/connect";
import { ValidNetwork, generateExplorerLink } from "@daohaus/keychain-utils";
import { Button, Card, Label, Link, ParLg, ParSm, SingleColumnLayout } from "@daohaus/ui";
import { useDaoData } from "@daohaus/moloch-v3-hooks";
import { useMarketMaker } from "../hooks/useMarketMaker";
import { useYeeter } from "../hooks/useYeeter";
import { CURATOR_CONTRACTS } from "../utils/constants";
import { truncateAddress } from "@daohaus/utils";
import styled from "styled-components";


const CardWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    `;

const StyledExternalLink = styled(Link)`
    text-decoration: none;
    color: ${({ theme }) => theme.info.step12};
    padding: 1rem;
    &:hover {
      text-decoration: none;
    }
  `;

const ContractItem = styled.div`
    display: flex;
    flex-direction: column;
    gap: .1rem;
    padding: 1rem;
    border: 1px solid #000;
    border-radius: 1rem;
    `;

export const ContractDetails = ({
    daoId,
    yeeterId,
    daoChain,
}: {
    daoId: string;
    yeeterId: string;
    daoChain: ValidNetwork;
}) => {

    const { dao } = useDaoData({
        daoId: daoId as string,
        daoChain: daoChain as string,
    });
    const { metadata, yeeter } = useYeeter({
        daoId,
        shamanAddress: yeeterId,
        chainId: daoChain,
    });
    const { marketMakerShaman } = useMarketMaker({
        daoId,
        yeeterShamanAddress: yeeterId,
        chainId: daoChain,
        daoShamans: dao?.shamen?.map((s) => s.shamanAddress),
    });

    const summoner = CURATOR_CONTRACTS.YEET24_SUMMONER[daoChain as ValidNetwork];
    const safeFactory = CURATOR_CONTRACTS.GNOSIS_SAFE_PROXY_FACTORY[daoChain as ValidNetwork];
    const yeeterSingleton = CURATOR_CONTRACTS.YEET24_SINGLETON[daoChain as ValidNetwork];
    const marketMakerSingleton = CURATOR_CONTRACTS.YEET24_SINGLETON[daoChain as ValidNetwork];
    const tokenSingleTon = CURATOR_CONTRACTS.GOV_LOOT_SINGLETON[daoChain as ValidNetwork];
    const weth = CURATOR_CONTRACTS.WETH[daoChain as ValidNetwork];
    const poster = CURATOR_CONTRACTS.POSTER[daoChain as ValidNetwork];


    return (<SingleColumnLayout
        subtitle={"Information on smart contracts"}

    >

        <CardWrapper>
            <Label>Campaign Contract</Label>
            {daoId && (<ContractItem>
                <ParLg>DAO </ParLg>
                <ParSm>
                    This is the molochv3 DAO contract.
                </ParSm>
                <ParSm>
                    {truncateAddress(daoId)}
                </ParSm>
                <StyledExternalLink
                    href={`https://admin.daohaus.fun/#/molochv3/${daoChain}/${daoId}`}
                    target="_blank"
                >
                    <Button variant="solid" size="sm">
                        View on DAOhaus Admin
                    </Button>
                </StyledExternalLink>
                <StyledExternalLink
                    href={generateExplorerLink({
                        chainId: daoChain as ValidNetwork,
                        address: daoId,
                    })}
                    target="_blank"
                >
                    <Button variant="solid" size="sm">
                        View on Etherscan
                    </Button>
                </StyledExternalLink>
            </ContractItem>)}
            {marketMakerShaman && (<ContractItem>
                <ParLg>Market Maker </ParLg>
                <ParSm>
                    This contract extention creates the LP.
                </ParSm>
                <ParSm>
                    {truncateAddress(marketMakerShaman)}
                </ParSm>
                <StyledExternalLink
                    href={generateExplorerLink({
                        chainId: daoChain as ValidNetwork,
                        address: marketMakerShaman,
                    })}
                    target="_blank"
                >
                    <Button variant="solid" size="sm">
                        View on Etherscan
                    </Button>
                </StyledExternalLink>
            </ContractItem>)}
            {yeeterId && (<ContractItem>
                <ParLg>Yeeter </ParLg>
                <ParSm>
                    This contract extention managers the crowdfund
                </ParSm>
                <ParSm>
                    {truncateAddress(yeeterId)}
                </ParSm>
                <StyledExternalLink
                    href={generateExplorerLink({
                        chainId: daoChain as ValidNetwork,
                        address: yeeterId,
                    })}
                    target="_blank"
                >
                    <Button variant="solid" size="sm">
                        View on Etherscan
                    </Button>
                </StyledExternalLink>
            </ContractItem>)}
            <Label>Factories and Singletons</Label>
            {(summoner && <ContractItem>
                <ParLg>Summoner</ParLg>
                <ParSm>
                    This contract is used to summon new campaigns.
                </ParSm>
                <ParSm>
                    {truncateAddress(summoner)}
                </ParSm>
                <StyledExternalLink
                    href={generateExplorerLink({
                        chainId: daoChain as ValidNetwork,
                        address: summoner,
                    })}
                    target="_blank"
                >
                    <Button variant="solid" size="sm">
                        View on Etherscan
                    </Button>
                </StyledExternalLink>
            </ContractItem>)}
            {(safeFactory && <ContractItem>
                <ParLg>Safe Factory</ParLg>
                <ParSm>
                    This contract is used to deploy new safes.
                </ParSm>
                <ParSm>
                    {truncateAddress(safeFactory)}
                </ParSm>
                <StyledExternalLink
                    href={generateExplorerLink({
                        chainId: daoChain as ValidNetwork,
                        address: safeFactory,
                    })}
                    target="_blank"
                >
                    <Button variant="solid" size="sm">
                        View on Etherscan
                    </Button>
                </StyledExternalLink>
            </ContractItem>)}
            {(yeeterSingleton && <ContractItem>
                <ParLg>Yeeter Singleton</ParLg>
                <ParSm>
                    This contract is used to deploy new yeeters.
                </ParSm>
                <ParSm>
                    {truncateAddress(yeeterSingleton)}
                </ParSm>
                <StyledExternalLink
                    href={generateExplorerLink({
                        chainId: daoChain as ValidNetwork,
                        address: yeeterSingleton,
                    })}
                    target="_blank"
                >
                    <Button variant="solid" size="sm">
                        View on Etherscan
                    </Button>
                </StyledExternalLink>
            </ContractItem>)}
            {(marketMakerSingleton && <ContractItem>
                <ParLg>Market Maker Singleton</ParLg>
                <ParSm>
                    This contract is used to deploy new market makers.
                </ParSm>
                <ParSm>
                    {truncateAddress(marketMakerSingleton)}
                </ParSm>
                <StyledExternalLink
                    href={generateExplorerLink({
                        chainId: daoChain as ValidNetwork,
                        address: marketMakerSingleton,
                    })}
                    target="_blank"
                >
                    <Button variant="solid" size="sm">
                        View on Etherscan
                    </Button>
                </StyledExternalLink>
            </ContractItem>)}
            {(tokenSingleTon && <ContractItem>
                <ParLg>Token Singleton</ParLg>
                <ParSm>
                    This contract is used to deploy new tokens.
                </ParSm>
                <ParSm>
                    {truncateAddress(tokenSingleTon)}
                </ParSm>
                <StyledExternalLink
                    href={generateExplorerLink({
                        chainId: daoChain as ValidNetwork,
                        address: tokenSingleTon,
                    })}
                    target="_blank"
                >
                    <Button variant="solid" size="sm">
                        View on Etherscan
                    </Button>
                </StyledExternalLink>
            </ContractItem>)}
            {(weth && <ContractItem>
                <ParLg>WETH</ParLg>
                <ParSm>
                    This contract is used to wrap ether.
                </ParSm>
                <ParSm>
                    {truncateAddress(weth)}
                </ParSm>
                <StyledExternalLink
                    href={generateExplorerLink({
                        chainId: daoChain as ValidNetwork,
                        address: weth,
                    })}
                    target="_blank"
                >
                    <Button variant="solid" size="sm">
                        View on Etherscan
                    </Button>
                </StyledExternalLink>
            </ContractItem>)}
            {(poster && <ContractItem>
                <ParLg>Poster</ParLg>
                <ParSm>
                    This contract is used to post messages.
                </ParSm>
                <ParSm>
                    {truncateAddress(poster)}
                </ParSm>
                <StyledExternalLink
                    href={generateExplorerLink({
                        chainId: daoChain as ValidNetwork,
                        address: poster,
                    })}
                    target="_blank"
                >
                    <Button variant="solid" size="sm">
                        View on Etherscan
                    </Button>
                </StyledExternalLink>
            </ContractItem>)}


        </CardWrapper>
    </SingleColumnLayout>
    );;
};
