import React, { useCallback } from 'react'
import clsx from 'clsx'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import CircularProgress from '@material-ui/core/CircularProgress'
import Fab from '@material-ui/core/Fab'
import DislikeIcon from '@material-ui/icons/Close'
import LikeIcon from '@material-ui/icons/Favorite'
import Layout from '../templates/Layout'
import SwipeCard from '../organisms/SwipeCard'
import { User } from '../../entities/user'
import { useRecommendUserMatching } from '../../services/hooks/recommendUser'

type Props = {
  firebaseUser: firebase.User
  user: User
}

const HomePage = ({ firebaseUser, user }: Props) => {
  const classes = useStyles()
  const [users, loading, onLikeUser, onDislikeUser] = useRecommendUserMatching(user)

  const onClickLikeUser = useCallback(
    async (user: User) => {
      const { matching, error } = await onLikeUser(user)
      if (matching && !error) {
        alert('マッチングしました！')
      }

      if (error) {
        alert('いいねに失敗しました！')
      }
    },
    [onLikeUser]
  )

  const onClickDislikeUser = useCallback(
    async (user: User) => {
      const { error } = await onDislikeUser(user)
      if (error) {
        alert('スキップに失敗しました！')
      }
    },
    [onDislikeUser]
  )

  return (
    <Layout firebaseUser={firebaseUser}>
      {loading ? (
        <div className={classes.loadingWrapper}>
          <CircularProgress />
        </div>
      ) : (
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
            {users.length === 0 && <Typography color="textSecondary">おすすめのユーザーはいません</Typography>}
          </div>
        </div>
      )}
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
    loadingWrapper: {
      flex: 1,
      display: 'flex',
      justifyContent: 'center',
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

export default HomePage
