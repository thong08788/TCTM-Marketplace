import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Box } from 'mdi-material-ui'
import { Grid, Typography } from '@mui/material'
import LocalShippingIcon from '@mui/icons-material/LocalShipping'

const TrackStatus = ({ TrackNo }) => {
  const [status, setStatus] = useState([])
  const [trackingValue, setTrackingValue] = useState('')

  useEffect(() => {
    setTrackingValue(TrackNo)
  }, [TrackNo])

  useEffect(() => {
    const handleTracking = async () => {
      try {
        const tokenResponse = await axios.request(
          'https://trackapi.thailandpost.co.th/post/api/v1/authenticate/token',
          {
            headers: {
              Authorization:
                'Token M_SCRNQLEXM6EVWrRdBxZYQWEPHAODWNH&N~M!TPE8MfU-BnSbWOGEDAT_J0CmD@ItN0M@DPUMAvV#D$RRKgLyDBZ-I=YyVXFTQJ', // Replace with your actual token
              'Content-Type': 'application/json'
            }
          }
        )

        const { token } = tokenResponse.data

        if (trackingValue) {
          // Request tracking data
          const data = JSON.stringify({
            status: 'all',
            language: 'TH',
            barcode: [trackingValue]
          })

          const trackingResponse = await axios.post('https://trackapi.thailandpost.co.th/post/api/v1/track', data, {
            headers: {
              Authorization: `Token ${token}`,
              'Content-Type': 'application/json'
            }
          })

          if (trackingResponse.data.message === 'successful') {
            const responseItems = trackingResponse.data.response.items[trackingValue]

            //ตกแต่ง Status
            const statusHtml = responseItems.map((element, index) => (
              <Grid container key={index}>
                <Grid item>
                  <Typography>
                    สถานะ {element.status_description}
                  </Typography>
                  <LocalShippingIcon />
                </Grid>
                <Grid item>
                  <Typography>สถานที่ {element.location}</Typography>
                </Grid>
                <Grid item>
                  <Typography>เวลา {element.status_date}</Typography>
                </Grid>
              </Grid>
            ))

            setStatus(statusHtml)
          } else {
            alert('Something went wrong!')
          }
        }
      } catch (error) {
        console.log(error)

        // alert('Something went wrong!');
      }
    }

    handleTracking()
  }, [trackingValue])

  return (
    <div>
      {/* แสดงผลสถานะที่ได้ */}
      {status}
    </div>
  )
}

export default TrackStatus
