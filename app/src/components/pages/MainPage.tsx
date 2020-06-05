import React, { useState, useCallback } from 'react'
import Typography from '@material-ui/core/Typography'
import CircularProgress from '@material-ui/core/CircularProgress'
import { useAuth } from '../../services/hooks/auth'
import { useUser } from '../../services/hooks/user'
import { SignInDialog } from '../organisms/SignInDialog'
import { CreateProfileCard } from '../organisms/CreateProfileCard'
import { ProfileContent } from '../organisms/contents/ProfileContent'
import { Layout } from '../templates/Layout'

const items = [
  { label: 'ホーム', value: 'home' },
  { label: 'チャット', value: 'chat' },
  { label: 'プロフィール', value: 'profile' },
]

const NotAuthenticatedView = () => {
  return <Typography>ログインしていません。</Typography>
}

const AuthenticatedView = ({ uid, content }: { uid: string; content: string }) => {
  const { user, loading } = useUser(uid)

  if (loading) {
    return <CircularProgress />
  }

  if (!user) {
    return <CreateProfileCard uid={uid} />
  }

  if (content === 'home') {
    return <Typography>ホーム</Typography>
  }

  if (content === 'chat') {
    return <Typography>チャット</Typography>
  }

  if (content === 'profile') {
    return <ProfileContent uid={uid} />
  }

  return <Typography>404 | Not Found</Typography>
}

export const MainPage = () => {
  const { firebaseUser, loading } = useAuth()
  const [content, setContent] = useState<string>('profile')

  const onClickItem = useCallback((value: string) => {
    setContent(value)
  }, [])

  const renderContent = useCallback(() => {
    if (loading) {
      return <CircularProgress />
    } else if (!firebaseUser) {
      return <NotAuthenticatedView />
    } else {
      return <AuthenticatedView uid={firebaseUser.uid} content={content} />
    }
  }, [content, firebaseUser, loading])

  return (
    <Layout user={firebaseUser} items={items} onClickItem={onClickItem}>
      {renderContent()}
      <SignInDialog open={!loading && !firebaseUser} />
    </Layout>
  )
}
