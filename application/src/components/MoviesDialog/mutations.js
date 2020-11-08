import {gql} from 'apollo-boost';

export const deleteMovieMutation = gql`
    mutation deleteMovieMutation($id: ID){
        deleteMovie(id: $id){
            id
        }
    }
`;