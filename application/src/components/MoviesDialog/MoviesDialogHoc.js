import { compose } from 'recompose';

import { graphql } from 'react-apollo';

import { deleteMovieMutation } from './mutations';
import { moviesQuery } from '../MoviesTable/queries';
import { directorsQuery as refreshDirectors } from '../DirectorsTable/queries';

const withGraphqlDelete = graphql(deleteMovieMutation, {
    props: ({mutate}) => ({
        deleteMovie: id => mutate({
            variables: id,
            //при вызове мутации дополнительно срабатывает запрос на получание директоров
            refetchQueries: [{query: moviesQuery}, {query: refreshDirectors}],
        }),
    }),
});

export default compose(withGraphqlDelete);
