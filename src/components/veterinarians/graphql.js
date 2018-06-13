import gql from "graphql-tag";

export const GET_VETS = gql`
    query vets{
        vets {
            id
            firstName
            lastName
            specialties {
                name
            }
        }
    }
`;