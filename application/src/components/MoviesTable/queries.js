import { gql } from 'apollo-boost';

export const moviesQuery = gql`
    query moviesQuery($name: String, $genre: String){
        movies(name: $name, genre: $genre) {
            id
            name
            genre
            rate
            watched
            director {
                id   
                name
            }
        }
    }
`;