import React from 'react'
import { FcGoogle } from 'react-icons/fc'
import { FaFacebook } from 'react-icons/fa'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import { signInWithFacebook, signInWithGoogle } from '../../services/auth'

type Props = {
  open: boolean
  onClose?: () => void
}

const SignInDialog = ({ open, onClose }: Props) => {
  const classes = useStyles()

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Techpit Matching</DialogTitle>
      <DialogContent>
        <div className={classes.btnWrapper}>
          <Button variant="contained" className={classes.fbBtn} onClick={signInWithFacebook}>
            <div className={classes.iconWrapper}>
              <FaFacebook color="#ffffff" size={24} />
            </div>
            <Typography className={classes.fbBtnText}>Facebookでログイン</Typography>
          </Button>
        </div>
        <div className={classes.btnWrapper}>
          <Button variant="contained" className={classes.googleBtn} onClick={signInWithGoogle}>
            <div className={classes.iconWrapper}>
              <FcGoogle size={24} />
            </div>
            <Typography className={classes.googleBtnText}>Googleでログイン</Typography>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    btnWrapper: {
      paddingBottom: theme.spacing(2),
    },
    iconWrapper: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      paddingRight: 12,
    },
    googleBtn: {
      justifyContent: 'start',
      width: 300,
      height: 50,
      backgroundColor: '#ffffff',
    },
    googleBtnText: {
      color: '#404040',
      fontSize: 14,
    },
    fbBtn: {
      justifyContent: 'start',
      width: 300,
      height: 50,
      backgroundColor: '#1877f2',
    },
    fbBtnText: {
      color: '#ffffff',
      fontSize: 14,
    },
  })
)

export default SignInDialog
