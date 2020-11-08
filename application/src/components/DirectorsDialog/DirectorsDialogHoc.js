import { compose } from 'recompose';

import { graphql } from 'react-apollo';

import { deleteDirectorMutation } from './mutations';
import { directorsQuery } from '../DirectorsTable/queries';

const withGraphqlDelete = graphql(deleteDirectorMutation, {
    props: ({mutate}) => ({
        deleteDirector: id => mutate({
            variables: id,
            //при вызове мутации дополнительно срабатывает запрос на получание директоров
            refetchQueries: [{query: directorsQuery}],
        }),
    }),
});

export default compose(withGraphqlDelete);
