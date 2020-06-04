import React, { useCallback } from 'react'
import Typography from '@material-ui/core/Typography'
import CircularProgress from '@material-ui/core/CircularProgress'
import { useAuth } from '../../services/hooks/auth'
import { useUser } from '../../services/hooks/user'
import { SignInDialog } from '../organisms/SignInDialog'
import { CreateUserCard } from '../organisms/CreateUserCard'
import { Layout } from '../templates/Layout'

const NotAuthenticatedView = () => {
  return <Typography>ログインしていません。</Typography>
}

const AuthenticatedView = ({ uid }: { uid: string }) => {
  const { user, loading } = useUser(uid)

  if (loading) {
    return <CircularProgress />
  }

  if (!user) {
    return <CreateUserCard uid={uid} />
  }

  return <Typography>hello world!!!</Typography>
}

export const MainPage = () => {
  const { firebaseUser, loading } = useAuth()

  const renderContent = useCallback(() => {
    if (loading) {
      return <CircularProgress />
    } else if (!firebaseUser) {
      return <NotAuthenticatedView />
    } else {
      return <AuthenticatedView uid={firebaseUser.uid} />
    }
  }, [firebaseUser, loading])

  return (
    <Layout user={firebaseUser}>
      {renderContent()}
      <SignInDialog open={!loading && !firebaseUser} />
    </Layout>
  )
}
