import gql from "graphql-tag"

export const SPECIALTY_FRAGMENTS = {
  specialty: gql`
      fragment Specialty on Specialty{
          id
          name
      }
  `
};

export const GET_SPECS = gql`
    query specialties{
        specialties{
            ...Specialty
        }
    }
    ${SPECIALTY_FRAGMENTS.specialty}
`;

export const ADD_SPEC = gql`
    mutation addSpecialty($name:String!){
        addSpecialty(input:{name:$name}){
            specialty{
                ...Specialty
            }
        }
    }
    ${SPECIALTY_FRAGMENTS.specialty}
`;

export const UPDATE_SPEC = gql`
    mutation updateSpecialty($specialtyId:Int!, $name:String!){
        updateSpecialty(input:{specialtyId:$specialtyId, name:$name}){
            specialty{
                ...Specialty
            }
        }
    }
    ${SPECIALTY_FRAGMENTS.specialty}
`;

export const REMOVE_SPEC = gql`
    mutation removeSpecialty($specialtyId:Int!){
        removeSpecialty(input:{specialtyId:$specialtyId}){
            specialties{
                ...Specialty
            }
        }
    }
    ${SPECIALTY_FRAGMENTS.specialty}
`;