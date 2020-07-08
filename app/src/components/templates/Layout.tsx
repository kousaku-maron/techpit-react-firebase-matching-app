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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Props<T = any> = {
  firebaseUser?: firebase.User
  items?: T[]
  renderItem?: (item: T) => React.ReactElement
}

export const Layout: React.FC<Props> = ({ firebaseUser, items, renderItem, children }) => {
  const classes = useStyles()
  const history = useHistory()

  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={renderItem && items ? classes.appBarWithSubDrawer : classes.appBar}>
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
            <ListItem button={true} onClick={() => history.push('/liked')}>
              <ListItemText primary="相手からのいいね" />
            </ListItem>
            <ListItem button={true} onClick={() => history.push('/chat')}>
              <ListItemText primary="チャット" />
            </ListItem>
            <ListItem button={true} onClick={() => history.push('/profile')}>
              <ListItemText primary="プロフィール" />
            </ListItem>
          </List>
        </Drawer>
        <Drawer
          variant="persistent"
          open={!!renderItem}
          classes={{
            paper: classes.subdrawerPaper,
          }}
        >
          <div className={classes.toolbar} />
          <Divider />
          <List>{renderItem && items && items.map((item) => renderItem(item))}</List>
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
    appBarWithSubDrawer: {
      width: `calc(100% - ${drawerWidth * 2}px)`,
      marginLeft: drawerWidth * 2,
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
