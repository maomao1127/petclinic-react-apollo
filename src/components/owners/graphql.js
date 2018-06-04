import gql from "graphql-tag";
import {VISIT_CONNECTION_FRAGMENTS} from "../visits/graphql";

export const OWNER_FRAGMENTS = {
  owner: gql`
      fragment Owner on Owner {
          id
          firstName
          lastName
          address
          city
          telephone
      }
  `,
  pet: gql`
      fragment Pet on Pet{
          id
          name
          birthDate
          owner{
              firstName
              lastName
          }
          type{
              id
              name
          }
          visits{
             ...VisitConnection
          }
      }
      ${VISIT_CONNECTION_FRAGMENTS.visitConnection}
  `,
};

export const GET_OWNERS = gql`
    {
        owners{
            ...Owner
            pets{
                ...Pet
            }
        }
    }
    ${OWNER_FRAGMENTS.owner}
    ${OWNER_FRAGMENTS.pet}
`;

export const GET_OWNER = gql`
    query owner($id:Int!){
        owner(id:$id){
            ...Owner
            pets{
                ...Pet
            }
        }
    }
    ${OWNER_FRAGMENTS.owner}
    ${OWNER_FRAGMENTS.pet}
`;

export const ADD_OWNER = gql`
    mutation addOwner($firstName:String!,$lastName:String!,$address:String!,$city:String!,$telephone:String!){
        addOwner(input: {firstName: $firstName, lastName: $lastName, address: $address, city: $city,telephone:$telephone}) {
            owner {
                ...Owner
                pets{
                    ...Pet
                }
            }
        }
    }
    ${OWNER_FRAGMENTS.owner}
    ${OWNER_FRAGMENTS.pet}
`;

export const UPDATE_OWNER = gql`
    mutation updateOwner($ownerId:Int!,$firstName:String,$lastName:String,$address:String,$city:String,$telephone:String){
        updateOwner(input:{ownerId:$ownerId, firstName: $firstName,lastName: $lastName, address: $address, city: $city,telephone:$telephone}) {
            owner{
                ...Owner
            }
        }
    }
    ${OWNER_FRAGMENTS.owner}
`;