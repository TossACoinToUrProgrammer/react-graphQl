import { withStyles } from '@material-ui/core/styles';
import { compose } from 'recompose';
import { graphql } from 'react-apollo';

import { moviesQuery } from './queries';

import { styles } from './styles';  

const withGraphql = graphql(moviesQuery, {
    options: ({name = '', genre = ''}) => ({
        variables: { name, genre },
    }),
})

export default compose(withStyles(styles), withGraphql);
