// ** React Imports
import { React, useEffect, useState } from 'react'
import { Slide } from 'react-slideshow-image' // นำเข้าไลบรารี Slide ที่คุณใช้
import 'react-slideshow-image/dist/styles.css' // Import สไตล์ของไลบรารี Slide

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import ButtonBase from '@mui/material/ButtonBase'
import Typography from '@mui/material/Typography'
import CardActionArea from '@mui/material/CardActionArea'
import axios from 'axios'

const SlideRecommended = () => {
  // ตัวแปรเก็บค่าข้อมูล Api
  const [slidedata, setSlideData] = useState([]) // ตัวแปรเก็บค่าข้อมูล Slide
  console.log('ข้อมูล slidedata', slidedata)

  // ดึงข้อมูลรูปภาพสไลด์ออกมา
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API}TCTM.home_page.product_recommend`)

        // console.log('ข้อมูลอิอิ', response.data.message.Data)
        setSlideData(response.data.message.Data)
      } catch (error) {
        console.error(error)
      }
    }

    fetchData()
  }, [])

  return (
    <Box sx={{ width: '100%' }}>
      {/* เพิ่มสไลด์ของคุณที่นี่ */}
      <Slide autoplay={false}>
        <Grid spacing={10} container direction='row' justifyContent='center' alignItems='center'>
          {slidedata.map((product, index) => (
            <Grid item key={index}>
              <Card>
                <ButtonBase sx={{ width: '200px', height: '280px' }}>
                  <Box sx={{ width: '100%', height: '100%' }}>
                    <CardActionArea>
                      <CardMedia
                        component='img'
                        image={`imgTctmProduct/${product.image_file_name}`}
                        height='200px'
                        sx={{ bgcolor: '#333', borderRadius: '6px' }}
                      />
                      <Box sx={{ width: '100%', padding: '10px' }}>
                        <Typography
                          variant='h6'
                          sx={{
                            fontWeight: 600,
                            overflow: 'hidden',
                            whiteSpace: 'nowrap',
                            textOverflow: 'ellipsis'
                          }}
                        >
                          {product.product_name} {/* แสดงชื่อสินค้า */}
                        </Typography>
                      </Box>
                      <Box sx={{ width: '100%' }}>
                        <Typography
                          variant='h6'
                          sx={{
                            fontWeight: 500,
                            overflow: 'hidden',
                            whiteSpace: 'nowrap',
                            textOverflow: 'ellipsis'
                          }}
                        >
                          ${product.product_price} {/* แสดงราคาสินค้า */}
                        </Typography>
                      </Box>
                    </CardActionArea>
                  </Box>
                </ButtonBase>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Slide>
    </Box>
  )
}

export default SlideRecommended
