import React, { useState, useEffect, useCallback } from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import CircularProgress from '@material-ui/core/CircularProgress'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Avatar from '@material-ui/core/Avatar'
import { Message } from '../../entities/message'
import { useRoom } from '../../services/hooks/room'
import { useEntryRooms } from '../../services/hooks/entryRoom'
import { useMessages, useSendMessage } from '../../services/hooks/message'
import { useUser } from '../../services/hooks/user'
import { Divider } from '@material-ui/core'

// RoomContent
// ----------------------------------------------------------------
type RoomContentProps = {
  roomIDs: string[]
  activeRoomID: string | null
  onClickRoomItem: (roomID: string) => void
}

type RoomItemProps = {
  roomID: string
  selected: boolean
  onClickItem: (roomID: string) => void
}

const RoomItem = ({ roomID, selected, onClickItem }: RoomItemProps) => {
  const [room] = useRoom(roomID)

  return (
    <ListItem button={true} selected={selected} onClick={() => onClickItem(roomID)}>
      <ListItemText>{room?.name}</ListItemText>
    </ListItem>
  )
}

const RoomContent = ({ roomIDs, activeRoomID, onClickRoomItem }: RoomContentProps) => {
  return (
    <List>
      {roomIDs.map((id) => (
        <RoomItem key={id} roomID={id} selected={id === activeRoomID} onClickItem={onClickRoomItem} />
      ))}
      {roomIDs.length === 0 && (
        <ListItem>
          <ListItemText secondary={'マッチングした相手がいません'} />
        </ListItem>
      )}
    </List>
  )
}

// MessageContent
// ----------------------------------------------------------------
type MessageContentProps = {
  roomID: string
  uid: string
}

type BubbleProps = {
  message: Message
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

const MessageContent = ({ roomID, uid }: MessageContentProps) => {
  const classes = useStyles()
  const [messages, loading] = useMessages(roomID)
  const [sendMessage] = useSendMessage(uid, roomID)
  const [text, setText] = useState<string>('')

  return (
    <div className={classes.messageContentContainer}>
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
        <TextField fullWidth={true} value={text} variant="outlined" onChange={(e) => setText(e.target.value)} />
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
    </div>
  )
}

// CharCard
// ----------------------------------------------------------------
type Props = {
  uid: string
}

const ChatCard = ({ uid }: Props) => {
  const classes = useStyles()
  const [entryRooms, loading] = useEntryRooms(uid)
  const [activeRoomID, setActiveRoomID] = useState<string | null>(null)

  useEffect(() => {
    if (entryRooms.length === 0) return
    setActiveRoomID(entryRooms[0].id)
  }, [entryRooms])

  const onClickRoomItem = useCallback((roomID) => {
    setActiveRoomID(roomID)
  }, [])

  return (
    <Card>
      <CardHeader title="やりとり" />
      <CardContent className={classes.cardContent}>
        {loading ? (
          <CircularProgress />
        ) : (
          <React.Fragment>
            <div className={classes.roomsContainer}>
              <RoomContent
                roomIDs={entryRooms.map((entryRoom) => entryRoom.id)}
                activeRoomID={activeRoomID}
                onClickRoomItem={onClickRoomItem}
              />
            </div>
            <Divider orientation="vertical" flexItem={true} />
            <div className={classes.messagesContainer}>
              {activeRoomID && <MessageContent roomID={activeRoomID} uid={uid} />}
            </div>
          </React.Fragment>
        )}
      </CardContent>
    </Card>
  )
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    cardContent: {
      display: 'flex',
      width: 700,
      height: '75vh',
    },
    roomsContainer: {
      width: 240,
      paddingRight: theme.spacing(2),
      overflow: 'auto',
    },
    messagesContainer: {
      flex: 1,
      paddingLeft: theme.spacing(2),
    },
    messageContentContainer: {
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      height: '100%',
    },
    bubblesContainer: {
      flex: 1,
      overflow: 'auto',
    },
    actionContainer: {
      display: 'flex',
      width: '100%',
    },
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
      display: 'flex',
      justifyContent: 'center',
      minWidth: 60,
      maxWidth: 300,
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
      display: 'flex',
      justifyContent: 'center',
      minWidth: 60,
      maxWidth: 300,
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

export default ChatCard
