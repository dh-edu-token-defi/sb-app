
import { useDHConnect } from "@daohaus/connect";
import styled from "styled-components";
import { BiColumnLayout, Button, Link } from "@daohaus/ui";
import { Link as RouterLink } from "react-router-dom";
import { supportedNetorks } from "../main";
import { ADMIN_URL, NFT_DAO_REFERRER } from "../utils/constants";
import { useDaosByUser } from "@daohaus/moloch-v3-hooks";
import { DaoCard } from "./DaoCard";
import { MolochV3Membership } from "@daohaus/utils";
import { ListDaosQueryResDaos, listDaos } from "@daohaus/moloch-v3-data";
import { ValidNetwork } from "@daohaus/keychain-utils";
import { useEffect, useState } from "react";

const LinkButton = styled(RouterLink)`
  text-decoration: none;
`;

const ExternalLinkButton = styled(Link)`
  text-decoration: none;
  color: unset;
  &:hover {
    text-decoration: none;
  }
`;


export const UserDaos = () => {
    const { chainId, isConnected, address } = useDHConnect();
    const [daoData, setDaoData] = useState<ListDaosQueryResDaos>([]);



    useEffect(() => {
        if (!isConnected || !address) {
            return;
        }

        const fetchDaos = async () => {
            const query = await listDaos({
                networkId: chainId as ValidNetwork,
                filter: {
                    referrer: NFT_DAO_REFERRER,
                    createdBy: address,
                },
            });
            setDaoData(query.items);
            console.log("daos", daoData);
        };

        fetchDaos();
    }
        , [chainId, isConnected, address]);


    const hasPersonalHub = () => {
        // check if tags array in all daos contain "personal"
        return daoData.some(dao => dao.tags?.includes("personal") ?? false);
    }

    return (
        <div>
            <h2>Your Hubs</h2>

            {daoData?.map(dao => (
                <DaoCard
                    key={dao.id}

                    {...dao}
                />
            ))}
            {(daoData.length == 0 || !hasPersonalHub()) && (<>
                <h2>Create Personal Hub</h2>
                <p>
                    The fun starts with your own personal hub.
                </p>
                <LinkButton to={`/summon/personal`} >
                    <Button variant="outline">Summon a Personal Hub</Button>
                </LinkButton></>)}
        </div>
    )



};
