import React, { useState, useEffect, useCallback } from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import CircularProgress from '@material-ui/core/CircularProgress'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Avatar from '@material-ui/core/Avatar'
import Layout from '../templates/Layout'
import { User } from '../../entities/user'
import { Message } from '../../entities/message'
import { useRoom } from '../../services/hooks/room'
import { useEntryRooms } from '../../services/hooks/entryRoom'
import { useMessages, useSendMessage } from '../../services/hooks/message'
import { useUser } from '../../services/hooks/user'

type Props = {
  firebaseUser: firebase.User
  user: User
}

type ItemProps = {
  roomID: string
  selected: boolean
  onClickItem: (roomID: string) => void
}

type BubbleProps = {
  message: Message
}

type ChatContentProps = {
  roomID: string
  uid: string
}

const Item = ({ roomID, selected, onClickItem }: ItemProps) => {
  const [room] = useRoom(roomID)

  return (
    <ListItem button={true} selected={selected} onClick={() => onClickItem(roomID)}>
      <ListItemText>{room?.name}</ListItemText>
    </ListItem>
  )
}

const RightBubble = ({ message }: BubbleProps) => {
  const classes = useStyles()

  return (
    <div className={classes.rightBubble}>
      <Typography>{message.text}</Typography>
    </div>
  )
}

const LeftBubble = ({ message }: BubbleProps) => {
  const classes = useStyles()
  const [user] = useUser(message.writerRef.id)

  return (
    <div className={classes.row}>
      <div className={classes.thumbnailWrapper}>
        <Avatar src={user?.thumbnailURL ?? undefined} />
      </div>
      <div className={classes.leftBubbleWrapper}>
        <div className={classes.leftBubble}>
          <Typography>{message.text}</Typography>
        </div>
      </div>
    </div>
  )
}

const ChatContent = ({ roomID, uid }: ChatContentProps) => {
  const classes = useStyles()
  const [messages, loading] = useMessages(roomID)
  const [sendMessage] = useSendMessage(uid, roomID)
  const [text, setText] = useState<string>('')

  return (
    <React.Fragment>
      <div className={classes.bubblesContainer}>
        {loading ? (
          <div className={classes.loadingWrapper}>
            <CircularProgress />
          </div>
        ) : (
          <div>
            {messages.map((message) => {
              if (message.writerRef.id === uid) {
                return (
                  <div key={message.id} className={classes.rightBubbleContainer}>
                    <RightBubble message={message} />
                  </div>
                )
              } else {
                return (
                  <div key={message.id} className={classes.leftBubbleContainer}>
                    <LeftBubble message={message} />
                  </div>
                )
              }
            })}

            <div className={classes.scrollableSpace} />
          </div>
        )}
      </div>
      <div className={classes.actionContainer}>
        <TextField fullWidth={true} value={text} onChange={(e) => setText(e.target.value)} />
        <div className={classes.sendButtonWrapper}>
          <Button
            color="primary"
            variant="contained"
            onClick={() => {
              sendMessage(text)
              setText('')
            }}
          >
            <Typography>送信</Typography>
          </Button>
        </div>
      </div>
    </React.Fragment>
  )
}

const ChatPage = ({ firebaseUser }: Props) => {
  const classes = useStyles()
  const [entryRooms, loading] = useEntryRooms(firebaseUser.uid)
  const [activeRoomID, setActiveRoomID] = useState<string | null>(null)

  useEffect(() => {
    if (entryRooms.length === 0) return
    setActiveRoomID(entryRooms[0].id)
  }, [entryRooms])

  const onClickRoom = useCallback((roomID) => {
    setActiveRoomID(roomID)
  }, [])

  return (
    <Layout firebaseUser={firebaseUser}>
      {loading ? (
        <div className={classes.loadingWrapper}>
          <CircularProgress />
        </div>
      ) : (
        <React.Fragment>
          <div className={classes.container}>
            <div className={classes.roomsContainer}>
              <Card className={classes.card}>
                <CardContent>
                  <List>
                    {entryRooms.map((entryRoom) => (
                      <Item
                        key={entryRoom.id}
                        roomID={entryRoom.id}
                        selected={entryRoom.id === activeRoomID}
                        onClickItem={onClickRoom}
                      />
                    ))}
                    {entryRooms.length === 0 && (
                      <ListItem>
                        <ListItemText secondary={'マッチングした相手がいません'} />
                      </ListItem>
                    )}
                  </List>
                </CardContent>
              </Card>
            </div>

            <div className={classes.contentContainer}>
              {activeRoomID && <ChatContent roomID={activeRoomID} uid={firebaseUser.uid} />}
            </div>
          </div>
        </React.Fragment>
      )}
    </Layout>
  )
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: 'flex',
      flex: 1,
    },
    roomsContainer: {
      position: 'fixed',
      top: 90,
      left: 260,
    },
    card: {
      width: 280,
      height: '80vh',
      overflow: 'auto',
    },
    contentContainer: {
      flex: 1,
      marginLeft: 280,
    },
    bubblesContainer: {
      flex: 1,
      height: '75vh',
      overflow: 'auto',
      marginBottom: theme.spacing(2),
    },
    actionContainer: {
      flex: 1,
      display: 'flex',
      width: '100%',
    },
    messagesContainer: {},
    loadingWrapper: {
      flex: 1,
      display: 'flex',
      justifyContent: 'center',
    },
    sendButtonWrapper: {
      display: 'flex',
      justifyContent: 'flex-end',
      width: 120,
    },
    thumbnailWrapper: {
      paddingRight: theme.spacing(2),
    },
    rightBubbleContainer: {
      display: 'flex',
      flex: 1,
      justifyContent: 'flex-end',
      paddingBottom: theme.spacing(2),
    },
    rightBubble: {
      maxWidth: 400,
      padding: theme.spacing(2),
      borderTopLeftRadius: theme.spacing(2),
      borderBottomRightRadius: theme.spacing(2),
      borderBottomLeftRadius: theme.spacing(2),
      backgroundColor: theme.palette.primary.light,
    },
    leftBubbleContainer: {
      display: 'flex',
      flex: 1,
      justifyContent: 'flex-start',
      paddingBottom: theme.spacing(2),
    },
    leftBubbleWrapper: {
      paddingTop: theme.spacing(2),
    },
    leftBubble: {
      maxWidth: 400,
      padding: theme.spacing(2),
      borderTopRightRadius: theme.spacing(2),
      borderBottomRightRadius: theme.spacing(2),
      borderBottomLeftRadius: theme.spacing(2),
      backgroundColor: theme.palette.secondary.light,
    },
    row: {
      display: 'flex',
      flexDirection: 'row',
    },
    scrollableSpace: {
      height: '50vh',
    },
  })
)

export default ChatPage
