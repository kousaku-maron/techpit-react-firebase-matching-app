import React, { useMemo } from 'react'
import { useHistory } from 'react-router-dom'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Drawer from '@material-ui/core/Drawer'
import Divider from '@material-ui/core/Divider'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import firebase from '../../firebase'
import { signOut } from '../../services/auth'

type Props = {
  firebaseUser?: firebase.User
}

const Layout: React.FC<Props> = ({ firebaseUser, children }) => {
  const classes = useStyles()
  const history = useHistory()

  const pathname = useMemo(() => {
    if (!history) {
      return ''
    }

    return history.location.pathname
  }, [history])

  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Techpit Matching
          </Typography>
          {firebaseUser && (
            <Button color="inherit" onClick={signOut}>
              ログアウト
            </Button>
          )}
        </Toolbar>
      </AppBar>
      <nav className={classes.nav}>
        <Drawer
          variant="permanent"
          open={true}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.toolbar} />
          <Divider />
          <List>
            <ListItem
              button={true}
              selected={pathname === '/home' || pathname === '/'}
              onClick={() => history.push('/home')}
            >
              <ListItemText primary="おすすめ" />
            </ListItem>
            <ListItem button={true} selected={pathname === '/liked'} onClick={() => history.push('/liked')}>
              <ListItemText primary="相手から" />
            </ListItem>
            <ListItem button={true} selected={pathname === '/chat'} onClick={() => history.push('/chat')}>
              <ListItemText primary="やりとり" />
            </ListItem>
            <ListItem button={true} selected={pathname === '/profile'} onClick={() => history.push('/profile')}>
              <ListItemText primary="マイページ" />
            </ListItem>
          </List>
        </Drawer>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <div className={classes.inner}>{children}</div>
      </main>
    </div>
  )
}

const drawerWidth = 240

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    appBar: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
    title: {
      flexGrow: 1,
    },
    toolbar: theme.mixins.toolbar,
    nav: {
      width: drawerWidth,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    subdrawerPaper: {
      marginLeft: drawerWidth,
      width: drawerWidth,
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(6),
    },
    inner: {
      display: 'flex',
      flexGrow: 1,
      justifyContent: 'center',
    },
  })
)

export default Layout
