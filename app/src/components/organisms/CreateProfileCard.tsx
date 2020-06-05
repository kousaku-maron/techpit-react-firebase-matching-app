import React, { useCallback } from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import TextField from '@material-ui/core/TextField'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import Avatar from '@material-ui/core/Avatar'
import { CreateUser } from '../../entities/user'
import { createUser } from '../../repositories/user'
import { useChangeProfileTools } from '../../services/hooks/user'

type GenderItem = 'male' | 'female' | ''

type Props = {
  uid: string
}

export const CreateProfileCard = ({ uid }: Props) => {
  const classes = useStyles()

  const {
    name,
    gender,
    introduction,
    thumbnailData,
    thumbnailDataURL,
    onChangeGender,
    onChangeName,
    onChangeIntroduction,
    onChangeThumbnailData,
  } = useChangeProfileTools()

  const onSubmit = useCallback(() => {
    if (!name || !gender || !introduction) {
      return alert('入力されていない項目があります。')
    }

    const user: CreateUser = {
      name,
      gender,
      introduction,
      ...(thumbnailData && { thumbnailData }),
    }

    createUser(uid, user)
  }, [gender, introduction, name, thumbnailData, uid])

  return (
    <Card className={classes.root}>
      <CardHeader title="プロフィール作成" />
      <CardContent className={classes.content}>
        <div className={classes.avatarContainer}>
          <IconButton component="label">
            <Avatar className={classes.avatar} src={thumbnailDataURL} />
            {/* MEMO: アバタークリックでイベントを起こさせたいので非表示 */}
            <input
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              onChange={(e) => {
                if (!e.target.files) return
                onChangeThumbnailData(e.target.files[0])
              }}
            />
          </IconButton>
        </div>

        <div className={classes.detailContainer}>
          <div className={classes.inputWrapper}>
            <TextField
              value={name}
              onChange={(e) => onChangeName(e.target.value)}
              label="ニックネーム"
              variant="outlined"
              fullWidth={true}
            />
          </div>

          <div className={classes.inputWrapper}>
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel id="gender-label">性別</InputLabel>
              <Select
                value={gender}
                onChange={(e) => onChangeGender(e.target.value as GenderItem)}
                labelId="gender-label"
                label="性別"
              >
                <MenuItem value="">
                  <em>未選択</em>
                </MenuItem>
                <MenuItem value="male">男性</MenuItem>
                <MenuItem value="female">女性</MenuItem>
              </Select>
            </FormControl>
          </div>

          <div className={classes.inputWrapper}>
            <TextField
              value={introduction}
              onChange={(e) => onChangeIntroduction(e.target.value)}
              label="自己紹介"
              multiline={true}
              rows={4}
              placeholder="はじめまして..."
              variant="outlined"
              fullWidth={true}
            />
          </div>
        </div>
      </CardContent>
      <CardActions>
        <Button color="primary" variant="contained" onClick={onSubmit}>
          <Typography>作成</Typography>
        </Button>
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
