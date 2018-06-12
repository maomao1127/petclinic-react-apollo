import gql from "graphql-tag"
import {OWNER_FRAGMENTS} from "../owners/graphql";

export const GET_PET_TYPES = gql`
    query pettypes{
        pettypes{
            id
            name
        }
    }
`;

export const GET_PET = gql`
    query pet($id:Int!){
        pet(id:$id){
            ...Pet
        }
    }
    ${OWNER_FRAGMENTS.pet}
`;

export const GET_PET_EDIT = gql`
    query pet_edit($id:Int!){
        pettypes{
            id
            name
        }
        pet(id:$id){
            ...Pet
        }
    }
  ${OWNER_FRAGMENTS.pet}
`;

export const ADD_PET = gql`
    mutation addPet($ownerId:Int!, $name:String!, $birthDate:Date!, $typeId:Int!){
        addPet(input:{ownerId:$ownerId, name:$name, birthDate:$birthDate, typeId:$typeId}){
            pet{
                ...Pet
            }
        }
    }
    ${OWNER_FRAGMENTS.pet}
`;

export const UPDATE_PET = gql`
    mutation updatePet($petId:Int!, $name:String, $birthDate:Date, $typeId:Int){
        updatePet(input:{petId:$petId, name:$name, birthDate:$birthDate, typeId:$typeId}){
            pet{
                ...Pet
            }
        }
    }
    ${OWNER_FRAGMENTS.pet}
`;

export const GET_PETS_OF_OWNER = gql`
    fragment Pets on Owner {
        pets{
            ...Pet
        }
    }
    ${OWNER_FRAGMENTS.pet}
`;