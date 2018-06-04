import gql from "graphql-tag";

export const GET_VETS = gql`
    {
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