import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { HomePage } from './components/pages/HomePage'
import { ChatPage } from './components/pages/ChatPage'
import { ProfilePage } from './components/pages/ProfilePage'
import { NotFoundPage } from './components/pages/NotFoundPage'
import { useAuth } from './services/hooks/auth'

const Navigator = () => {
  const { firebaseUser, loading } = useAuth()

  return (
    <Router>
      <Switch>
        <Route path="/profile" component={() => <ProfilePage firebaseUser={firebaseUser} loading={loading} />} />
        <Route path="/chat" component={() => <ChatPage firebaseUser={firebaseUser} loading={loading} />} />
        <Route
          exact
          path={['/', '/home']}
          component={() => <HomePage firebaseUser={firebaseUser} loading={loading} />}
        />
        <Route path="*" component={() => <NotFoundPage firebaseUser={firebaseUser} loading={loading} />} />
      </Switch>
    </Router>
  )
}

export default Navigator
