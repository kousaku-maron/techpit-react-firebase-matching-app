import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { HomePage } from './components/pages/HomePage'
import { ChatPage } from './components/pages/ChatPage'
import { CreateProfilePage } from './components/pages/CreateProfilePage'
import { ProfilePage } from './components/pages/ProfilePage'
import { NotFoundPage } from './components/pages/NotFoundPage'
import { LoadingPage } from './components/pages/LoadingPage'
import { SignInPage } from './components/pages/SignInPage'
import { useAuth } from './services/hooks/auth'
import { useUser } from './services/hooks/user'

const AuthenticatedNavigator = ({ firebaseUser }: { firebaseUser: firebase.User }) => {
  const { user, loading } = useUser(firebaseUser.uid)

  if (loading) {
    return <LoadingPage />
  }

  if (!user) {
    return <CreateProfilePage firebaseUser={firebaseUser} />
  }

  return (
    <Router>
      <Switch>
        <Route path="/profile" component={() => <ProfilePage firebaseUser={firebaseUser} user={user} />} />
        <Route path="/chat" component={() => <ChatPage firebaseUser={firebaseUser} user={user} />} />
        <Route exact path={['/', '/home']} component={() => <HomePage firebaseUser={firebaseUser} user={user} />} />
        <Route path="*" component={() => <NotFoundPage firebaseUser={firebaseUser} user={user} />} />
      </Switch>
    </Router>
  )
}

const Navigator = () => {
  const { firebaseUser, loading } = useAuth()

  if (loading) {
    return <LoadingPage />
  }

  if (!firebaseUser) {
    return <SignInPage open={!firebaseUser} />
  }

  return <AuthenticatedNavigator firebaseUser={firebaseUser} />
}

export default Navigator
