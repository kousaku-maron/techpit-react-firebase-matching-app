import React from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Avatar from '@material-ui/core/Avatar'
import { User } from '../../entities/user'

type Props = {
  user: User
}

export const SwipeCard = ({ user }: Props) => {
  const classes = useStyles()

  return (
    <Card className={classes.root}>
      <CardContent className={classes.content}>
        <div className={classes.avatarWrapper}>
          <Avatar className={classes.avatar} src={user.thumbnailURL ?? undefined} />
        </div>
        <div className={classes.nameWrapper}>
          <Typography>{user.name}</Typography>
        </div>

        <Typography variant="caption">自己紹介</Typography>
        <Typography>{user.introduction}</Typography>
      </CardContent>
    </Card>
  )
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: 400,
      height: 500,
      padding: theme.spacing(2),
    },
    content: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatarWrapper: {
      paddingBottom: theme.spacing(2),
    },
    nameWrapper: {
      paddingBottom: theme.spacing(4),
    },
    avatar: {
      width: 120,
      height: 120,
    },
  })
)
