import "react-multi-carousel/lib/styles.css";

import { useRecords } from "../hooks/useComments";
import { useDHConnect } from "@daohaus/connect";
import { ValidNetwork } from "@daohaus/keychain-utils";
import { Card, Link, ParLg, SingleColumnLayout } from "@daohaus/ui";
import styled from "styled-components";
import { MemberProfileAvatar } from "@daohaus/moloch-v3-macro-ui";
import { useDaoMember } from "@daohaus/moloch-v3-hooks";
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
};

const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: -5rem;
`;

const CommentLinks = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ReactMarkdownWrapper = styled(ReactMarkdown)`
  font-size: 3rem;
`;

const CommentCard = styled(Card)`
  width: 800px;
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

  if (!parent || !comments) {
    return <div>Loading...</div>;
  }

  return (
    <SingleColumnLayout
      subtitle={"Holders can post comments here."}
      description={`Comments (${comments.length}) `}
    >
      <CardWrapper>
        {comments.map((comment, key) => {
          const parsedComment: YeetComment =
            comment.parsedContent as YeetComment;
          return (
            <CommentCard key={key} width="100%">
              {parsedComment?.authorAddress || parsedComment?.authorAddress ? (
                <MemberProfileAvatar
                  daoChain={daoChain}
                  memberAddress={
                    parsedComment?.authorAddress || parsedComment?.authorAddress
                  }
                />
              ) : (
                <MemberProfileAvatar
                  daoChain={daoChain}
                  memberAddress={
                    parsedComment?.authorAddress || parsedComment?.authorAddress
                  }
                />
              )}
              <ReactMarkdownWrapper
                components={{
                  a: ({ node, ...props }) => (
                    <a style={{ color: "#00dd65" }} {...props} />
                  ),
                }}
              >
                {parsedComment.content}
              </ReactMarkdownWrapper>
              <CommentLinks>
                <Link href="#">
                  Created At: {formatDate(Number(parsedComment.createdAt))}
                </Link>
              </CommentLinks>
            </CommentCard>
          );
        })}
      </CardWrapper>
    </SingleColumnLayout>
  );
};
