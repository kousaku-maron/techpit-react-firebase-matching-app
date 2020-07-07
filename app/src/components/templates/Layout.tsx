import React from 'react'
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

export const Layout: React.FC<Props> = ({ firebaseUser, children }) => {
  const classes = useStyles()
  const history = useHistory()

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
      <nav className={classes.drawer}>
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
            <ListItem button={true} onClick={() => history.push('/home')}>
              <ListItemText primary="ホーム" />
            </ListItem>
            <ListItem button={true} onClick={() => history.push('/chat')}>
              <ListItemText primary="チャット" />
            </ListItem>
            <ListItem button={true} onClick={() => history.push('/profile')}>
              <ListItemText primary="プロフィール" />
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
    drawer: {
      width: drawerWidth,
    },
    drawerPaper: {
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
