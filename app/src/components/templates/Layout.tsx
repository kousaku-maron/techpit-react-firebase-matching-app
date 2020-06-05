import React from 'react'
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
  user: firebase.User | null
  items: {
    label: string
    value: string
  }[]
  onClickItem: (value: string) => void
}

export const Layout: React.FC<Props> = ({ user, items, onClickItem, children }) => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Techpit Matching
          </Typography>
          {user && (
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
            {items.map((item) => (
              <ListItem key={item.value} button={true} onClick={() => onClickItem(item.value)}>
                <ListItemText primary={item.label} />
              </ListItem>
            ))}
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
