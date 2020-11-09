export const styles = theme => ({
  search: {
    position: 'relative',
    width: '100%',
    marginBottom: theme.spacing(3),
    display: 'flex',
    alignItems: 'center',
    paddingTop: theme.spacing(1),
    paddingRight: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  dropDown: {
    width: '30%',
  },
  searchIcon: {
    width: theme.spacing(9),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    width: '70%',
  },
  inputInput: {
    paddingLeft: theme.spacing(10),
  },
});
