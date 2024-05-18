import { gql } from "graphql-request";
import { MEME_YEETER_SUMMONER_REFERRER } from "./constants";

const yeeterFields = `
id
createdAt
dao {
  id
  referrer
}
endTime
startTime
isShares
multiplier
minTribute
goal
balance
yeetCount
vault
`;

export const GET_YEETER = gql`
  query yeeter($shamanAddress: String!) {
    yeeter(id: $shamanAddress) {
      ${yeeterFields}
    }
  }
`;

export const GET_YEETERS = gql`
  {
    yeeters(
      first: 1000, 
      orderBy: createdAt, 
      orderDirection: desc
      where: {
        dao_: {
          referrer: "${MEME_YEETER_SUMMONER_REFERRER}"
        }
      }
    ) {
      ${yeeterFields}

    }
  }
`;

export const LIST_YEETS = gql`
  query yeets($shamanAddress: String!) {
    yeets(
      where: { yeeter: $shamanAddress }
      orderBy: createdAt
      orderDirection: desc
      first: 1000
    ) {
      id
      createdAt
      contributor
      amount
      shares
      message
    }
  }
`;

export const LATEST_YEETS = gql`
  {
    yeets(
      orderBy: createdAt, 
      orderDirection: desc, 
      first: 20,
      where: {
        dao_: {
          referrer: "${MEME_YEETER_SUMMONER_REFERRER}"
        }
    }) {
      id
      createdAt
      contributor
      amount
      shares
      message
    }
  }
`;

export const LIST_MY_YEETS = gql`
  query yeets($account: String!) {
    yeets(
      where: { contributor: $account,
        dao_: {
          referrer: "${MEME_YEETER_SUMMONER_REFERRER}"
        }
       }
      orderBy: createdAt
      orderDirection: desc
      first: 1000
    ) {
      id
      createdAt
      contributor
      amount
      shares
      message
      yeeter {
        ${yeeterFields}
      }
    }
  }
`;

export const GET_YEETS_BY_TX = gql`
  query yeets($txHash: String!) {
    yeets(where: { txHash: $txHash }, first: 1) {
      id
      txHash
      shares
    }
  }
`;
