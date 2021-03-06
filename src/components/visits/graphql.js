import gql from "graphql-tag"

export const VISIT_FRAGMENTS = {
  visit: gql`
      fragment Visit on Visit{
          id
          date
          description
      }
  `,
};

export const VISIT_CONNECTION_FRAGMENTS ={
  visitConnection: gql`
      fragment VisitConnection on VisitConnection{
          totalCount
          visits{
              ...Visit
          }
      }
      ${VISIT_FRAGMENTS.visit}
  `
};

export const ADD_VISIT = gql`
    mutation addVisit($petId:Int!, $description:String!, $date:Date){
        addVisit(input:{petId:$petId, description:$description, date:$date}){
            visit{
                ...Visit
            }
        }
    }
    ${VISIT_FRAGMENTS.visit}
`;

export const GET_VISITS_OF_PET = gql`
    fragment Visits on Pet {
        visits{
            ...VisitConnection
        }
    }
    ${VISIT_CONNECTION_FRAGMENTS.visitConnection}
`;