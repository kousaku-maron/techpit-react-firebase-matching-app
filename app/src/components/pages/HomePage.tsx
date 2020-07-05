import React, { useCallback } from 'react'
import clsx from 'clsx'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import CircularProgress from '@material-ui/core/CircularProgress'
import { Layout } from '../templates/Layout'
import { User } from '../../entities/user'
import { useMatchingTools } from '../../services/hooks/matching'
import { SwipeCard } from '../organisms/SwipeCard'
import { Fab, Theme } from '@material-ui/core'
import DislikeIcon from '@material-ui/icons/Close'
import LikeIcon from '@material-ui/icons/Favorite'

type Props = {
  firebaseUser: firebase.User
  user: User
}

export const HomePage = ({ firebaseUser, user }: Props) => {
  const classes = useStyles()
  const { users, loading, onLikeUser, onDislikeUser } = useMatchingTools(firebaseUser.uid, user)

  const onClickLikeUser = useCallback(
    (user: User) => {
      onLikeUser(user)
    },
    [onLikeUser]
  )

  const onClickDislikeUser = useCallback(
    (user: User) => {
      onDislikeUser(user)
    },
    [onDislikeUser]
  )

  return (
    <Layout firebaseUser={firebaseUser}>
      {loading && <CircularProgress />}

      <div className={classes.root}>
        <div className={classes.cards}>
          {users.map((user, index) => {
            if (index === 0) {
              return (
                <div key={user.id} className={classes.cardWrapper}>
                  <SwipeCard user={user} />

                  <div className={classes.actionContainer}>
                    <Fab onClick={() => onClickDislikeUser(user)} className={classes.fab}>
                      <DislikeIcon />
                    </Fab>
                    <Fab color="secondary" onClick={() => onClickLikeUser(user)} className={classes.fab}>
                      <LikeIcon />
                    </Fab>
                  </div>
                </div>
              )
            }

            return (
              <div key={user.id} className={clsx(classes.cardWrapper, classes.hidden)}>
                <SwipeCard user={user} />
              </div>
            )
          })}
        </div>
      </div>
    </Layout>
  )
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    cards: {
      position: 'relative',
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    actionContainer: {
      display: 'flex',
      justifyContent: 'space-between',
      width: 200,
      paddingTop: theme.spacing(4),
    },
    cardWrapper: {
      position: 'absolute',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    hidden: {
      display: 'none',
    },
    fab: {
      transform: 'scale(1.5,1.5)',
    },
  })
)
