import React from 'react'
import { Layout } from '../templates/Layout'
import { SignInDialog } from '../organisms/SignInDialog'

type Props = {
  open: boolean
}

export const SignInPage = ({ open }: Props) => {
  return (
    <Layout>
      <SignInDialog open={open} />
    </Layout>
  )
}
