import "react-multi-carousel/lib/styles.css";

import { useRecords } from "../hooks/useComments";
import { useDHConnect } from "@daohaus/connect";
import { useDaoData } from "../hooks/useDaoData";
import { ValidNetwork } from "@daohaus/keychain-utils";
import { Avatar, Card, Link, ParLg, SingleColumnLayout } from "@daohaus/ui";
import styled from "styled-components";
import { ZERO_ADDRESS } from "@daohaus/utils";
import { MemberProfileAvatar } from "@daohaus/moloch-v3-macro-ui";
import { FormBuilder } from "@daohaus/form-builder";
import { useDaoMember } from "@daohaus/moloch-v3-hooks";
import { APP_FORM } from "../legos/forms";
import { AppFieldLookup } from "../legos/fieldConfig";
import ReactMarkdown from "react-markdown";
import CommentButton from "./CommentButton";

export function formatDate(createdAt: number) {
    const date = new Date(createdAt * 1000);
    const formattedDate = `${date.getFullYear()} ${date.toLocaleString(
      "default",
      { month: "short" }
    )} ${date.getDate()} ${date.getHours()}:${
      date.getMinutes() < 10 ? "0" : ""
    }${date.getMinutes()}`;
  
    return formattedDate;
  }

  export type YeetComment = {
    daoId: string;
    title: string;
    content: string;
    contentURI: string;
    imageURI: string;
    authorAddress: string;
    createdAt: string;
  }


const CardWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    `;

const CommentLinks = styled.div`
    display: flex;
    justify-content: space-between;
    `;

export const YeetComments = ({
    daoId,
    yeeterId,
    daoChain,
}: {
    daoId: string;
    yeeterId: string;
    daoChain: ValidNetwork;
}) => {
    const { address } = useDHConnect();

    const { member } = useDaoMember({
        daoChain: daoChain,
        daoId: daoId,
        memberAddress: address,
      });

    const { records: comments, refetch: refetchComments } = useRecords({
        daoId: daoId,
        chainId: daoChain,
    });

    console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>comments", comments);

    if (!parent || !comments) {
        return <div>Loading...</div>;
    }

    const refetchYeetComments = () => {
        refetchComments();
    } 


    return (<SingleColumnLayout
        subtitle={"Collectors can post comments here."}
        description={`Comments (${comments.length})`}
    >

        <CardWrapper>
            {comments.length === 0 && (
                <Card>
                    <ParLg>No comments yet. You can be the first.</ParLg>
                </Card>
            )}
            {comments.map((comment, key) => {
                const parsedComment: YeetComment = comment.parsedContent as YeetComment;
                return (
                    <Card key={key}>
                        {parsedComment?.authorAddress || parsedComment?.authorAddress ? (
                            <MemberProfileAvatar
                                daoChain={daoChain}
                                memberAddress={
                                    parsedComment?.authorAddress || parsedComment?.authorAddress
                                }
                            />
                        ) : (
                            <MemberProfileAvatar daoChain={daoChain} memberAddress={
                                parsedComment?.authorAddress || parsedComment?.authorAddress
                            } />
                        )}
                        <ReactMarkdown components={{
                            a: ({ node, ...props }) => <a style={{ color: '#00dd65' }} {...props} />
                        }}>{parsedComment.content}</ReactMarkdown>
                        <CommentLinks>
                            <Link href="#" >
                                Created At: {formatDate(Number(parsedComment.createdAt))}
                            </Link>
                        </CommentLinks>
                    </Card>
                );
            })}
        </CardWrapper>
        {true || member && Number(member?.shares) > 0 ? (
            <CommentButton
                daoChain={daoChain}
                daoId={daoId}
                yeeterId={yeeterId}
                refetch={refetchYeetComments}
             />
        ) : (
            <ParLg>Only Collectors can comment</ParLg>
        )}
    </SingleColumnLayout>
    );;
};
