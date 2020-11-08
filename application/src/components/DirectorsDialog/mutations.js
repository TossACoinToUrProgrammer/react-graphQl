import {gql} from 'apollo-boost';

export const deleteDirectorMutation = gql`
    mutation deleteDirectorMutation($id: ID){
        deleteDirector(id: $id){
            id
        }
    }
`;