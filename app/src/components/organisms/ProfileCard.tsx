import React, { useState, useCallback, useEffect } from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import TextField from '@material-ui/core/TextField'
import Avatar from '@material-ui/core/Avatar'
import { UpdateUser } from '../../entities/user'
import { updateUser, getUserRef } from '../../repositories/user'
import { useUser, useThumbnailTools } from '../../services/hooks/user'

type Props = {
  uid: string
}

type GenderLabel = '男性' | '女性' | ''

const ProfileCard = ({ uid }: Props) => {
  const classes = useStyles()
  const [user] = useUser(uid)
  const [thumbnailData, thumbnailDataURL, onChangeThumbnailData, onChangeThumbnailDataURL] = useThumbnailTools()
  const [isEdit, setIsEdit] = useState<boolean>(false)
  const [genderLabel, setGenderLabel] = useState<GenderLabel>('')
  const [name, setName] = useState<string>('')
  const [introduction, setIntroduction] = useState<string>('')

  const onChangeName = useCallback((value: string) => {
    setName(value)
  }, [])

  const onChangeIntroduction = useCallback((value: string) => {
    setIntroduction(value)
  }, [])

  // MEMO: 現状のUserデータを入れる。
  useEffect(() => {
    if (!user) return

    setName(user.name)
    setIntroduction(user.introduction)

    if (user.gender === 'male') {
      setGenderLabel('男性')
    }

    if (user.gender === 'female') {
      setGenderLabel('女性')
    }

    if (user.thumbnailURL) {
      onChangeThumbnailDataURL(user.thumbnailURL)
    }
  }, [onChangeIntroduction, onChangeName, onChangeThumbnailDataURL, user])

  const onSubmit = useCallback(() => {
    if (!name || !introduction) {
      return alert('入力されていない項目があります。')
    }

    const user: UpdateUser = {
      name,
      introduction,
      ...(thumbnailData && { thumbnailData }),
    }

    const userRef = getUserRef(uid)

    updateUser(userRef, user)
    setIsEdit(false)
  }, [introduction, name, thumbnailData, uid])

  return (
    <Card className={classes.root}>
      <CardHeader title="マイページ" />
      <CardContent className={classes.content}>
        <div className={classes.avatarContainer}>
          <IconButton component="label">
            <Avatar className={classes.avatar} src={thumbnailDataURL} />
            {/* MEMO: アバタークリックでイベントを起こさせたいので非表示 */}
            {isEdit && (
              <input
                type="file"
                accept="image/*"
                style={{ display: 'none' }}
                onChange={(e) => {
                  if (!e.target.files) return
                  onChangeThumbnailData(e.target.files[0])
                }}
              />
            )}
          </IconButton>
        </div>

        <div className={classes.detailContainer}>
          <div className={classes.inputWrapper}>
            {!isEdit && (
              <React.Fragment>
                <Typography variant="caption">ニックネーム</Typography>
                <Typography>{name}</Typography>
              </React.Fragment>
            )}
            {isEdit && (
              <TextField
                value={name}
                onChange={(e) => setName(e.target.value)}
                label="ニックネーム"
                variant="outlined"
                fullWidth={true}
              />
            )}
          </div>

          <div className={classes.inputWrapper}>
            <Typography variant="caption">性別</Typography>
            <Typography>{genderLabel}</Typography>
          </div>

          <div className={classes.inputWrapper}>
            {!isEdit && (
              <React.Fragment>
                <Typography variant="caption">自己紹介</Typography>
                <Typography>{introduction}</Typography>
              </React.Fragment>
            )}
            {isEdit && (
              <TextField
                value={introduction}
                onChange={(e) => setIntroduction(e.target.value)}
                label="自己紹介"
                multiline={true}
                rows={4}
                placeholder="はじめまして..."
                variant="outlined"
                fullWidth={true}
              />
            )}
          </div>
        </div>
      </CardContent>
      <CardActions>
        {isEdit && (
          <React.Fragment>
            <Button color="primary" variant="contained" onClick={onSubmit}>
              <Typography>保存</Typography>
            </Button>
            <Button color="primary" variant="contained" onClick={() => setIsEdit(false)}>
              <Typography>キャンセル</Typography>
            </Button>
          </React.Fragment>
        )}
        {!isEdit && (
          <Button color="primary" variant="contained" onClick={() => setIsEdit(true)}>
            <Typography>編集</Typography>
          </Button>
        )}
      </CardActions>
    </Card>
  )
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: 700,
      padding: theme.spacing(2),
    },
    content: {
      display: 'flex',
    },
    avatarContainer: {
      width: 240,
      paddingRight: theme.spacing(2),
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    detailContainer: {
      flex: 1,
    },
    avatar: {
      width: 120,
      height: 120,
    },
    formControl: {
      minWidth: 120,
    },
    inputWrapper: {
      paddingBottom: theme.spacing(2),
    },
  })
)

export default ProfileCard
