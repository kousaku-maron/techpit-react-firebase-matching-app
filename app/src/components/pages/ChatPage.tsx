import React from 'react'
// import { createStyles, makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import { Layout } from '../templates/Layout'
import { User } from '../../entities/user'

type Props = {
  firebaseUser: firebase.User
  user: User
}

const items = ['aa', 'bb']
const renderItem = (item: string) => (
  <ListItem button={true}>
    <ListItemText>{item}</ListItemText>
  </ListItem>
)

export const ChatPage = ({ firebaseUser }: Props) => {
  return (
    <Layout firebaseUser={firebaseUser} items={items} renderItem={renderItem}>
      <Typography>チャット</Typography>
    </Layout>
  )
}

// const drawerWidth = 240

// const useStyles = makeStyles(() =>
//   createStyles({
//     drawerPaper: {
//       marginLeft: drawerWidth,
//       width: drawerWidth,
//     },
//   })
// )
