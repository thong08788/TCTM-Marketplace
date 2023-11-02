// ** React Imports
import { useState, useEffect } from 'react'

// ** Next Import
import { useRouter } from 'next/router'

// ** Material UI Imports
import { Box, Button, Dialog, Card, CardContent, Divider, Grid, TextField, Typography } from '@mui/material'

// ** Axios import
import axios from 'axios'
import ReCAPTCHA from 'react-google-recaptcha'

const DialogPost = ({ open, handleClose, userId }) => {
  const Route = useRouter()

  // นำเข้าตัวsweetalert2
  const SAlert = require('sweetalert2')

  // ตัวแปรเก็บค่าข้อมูล
  const [title, setTitle] = useState('') // ข้อมูล title
  const [description, setDescription] = useState('') // ข้อมูล description

  // เซตค่า title และ description เมื่อ open มีการเปลี่ยนแปลง
  useEffect(() => {
    if (open) {
      setTitle('')
      setDescription('')
    }
  }, [open])

  // ฟังชันเก็บค่าข้อมูล
  const handleTitleChange = event => {
    setTitle(event.target.value)
  }

  const handleDesChange = event => {
    setDescription(event.target.value)
  }

  // คอมโพเนนต์ของ reCAPTCHA
  const [recaptchaValue, setRecaptchaValue] = useState(null)

  // ฟังก์ชัน Insert Data
  const handleInsertSubmit = e => {
    e.preventDefault()

    // ตรวจสอบว่า reCAPTCHA ถูกต้อง
    if (!recaptchaValue) {
      // กระทำเมื่อ reCAPTCHA ไม่ถูกต้อง (ตัวอย่าง: เปลี่ยนสี reCAPTCHA เป็นแดง)
      const recaptchaElement = document.querySelector('.grecaptcha-badge')
      if (recaptchaElement) {
        recaptchaElement.style.backgroundColor = 'red'
      }

      // แสดงข้อความหรือบล็อกการส่ง
      SAlert.fire({
        icon: 'error',
        title: 'Please complete the reCAPTCHA.'
      })

      return
    }

    // ตรวจสอบค่าว่างใน TextField
    if (!title || !description) {
      handleClose()
      SAlert.fire({
        icon: 'error',
        title: 'You did not fill in all the information...',
        text: 'Please fill in all the information!'
      })

      return
    }

    // ส่งข้อมูลไปยังเซิร์ฟเวอร์หลังจากยืนยัน reCAPTCHA
    const data = {
      user_id: userId,
      req_header: title,
      req_description: description,
      recaptchaValue: recaptchaValue
    }

    axios
      .post(`${process.env.NEXT_PUBLIC_API}TCTM.requirements.postrequirement`, data)
      .then(response => {
        console.log(response)

        // ปิด Dialog
        handleClose(false)

        // reset display หลังจากส่งข้อมูลเสร็จ
        Route.replace(Route.asPath, undefined, { scroll: false })
      })
      .catch(error => {
        console.log(error)
      })
    SAlert.fire({
      icon: 'success',
      title: 'The information has been completed. Please wait for confirmation.'
    })

    handleClose()
  }

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <Card variant='outlined' sx={{ maxWidth: '600px' }}>
          <CardContent>
            <Typography variant='h5' sx={{ fontWeight: 'bold' }}>
              Create Post
            </Typography>
            <Divider sx={{ marginY: '10px' }} />
            <form onSubmit={handleInsertSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label='Title'
                    value={title}
                    onChange={handleTitleChange}
                    variant='outlined'
                    InputProps={{
                      style: {
                        borderRadius: '10px'
                      }
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    multiline
                    rows={3}
                    value={description}
                    onChange={handleDesChange}
                    label='Description'
                    variant='outlined'
                    InputProps={{
                      style: {
                        borderRadius: '10px'
                      }
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <ReCAPTCHA
                    sitekey='6Lfu5-ooAAAAAMGil0g9-Q7SKKQKTmntoYO6arEu' // ใช้ Site Key ที่คุณได้จาก ReCAPTCHA
                    onChange={value => setRecaptchaValue(value)}
                  />
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button
                      variant='contained'
                      color='primary'
                      type='submit'
                      onClick={handleInsertSubmit}
                      sx={{ marginRight: 2 }}
                    >
                      POST
                    </Button>
                    <Button variant='contained' color='secondary' onClick={handleClose}>
                      Cancel
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>
      </Dialog>
    </div>
  )
}

export default DialogPost
