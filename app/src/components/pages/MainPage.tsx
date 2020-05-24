import React from 'react'
import Typography from '@material-ui/core/Typography'
import { useAuthState } from '../../store/hooks'
import { useAuthEffect } from '../../services/auth'
import { SignInDialog } from '../organisms/SignInDialog'
import { Layout } from '../templates/Layout'

export const MainPage = () => {
  const { uid } = useAuthState()
  useAuthEffect()

  return (
    <Layout>
      {uid ? (
        <React.Fragment>
          <Typography>ログインしています。</Typography>
          <Typography>uid: {uid}</Typography>
        </React.Fragment>
      ) : (
        <Typography>ログインしていません。</Typography>
      )}

      <SignInDialog open={!uid} />
    </Layout>
  )
}
