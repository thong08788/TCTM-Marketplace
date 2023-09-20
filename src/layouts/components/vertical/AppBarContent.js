// ** React Imports
import { useState } from 'react'

// ** Next Import
import Link from 'next/link'
import { useRouter } from 'next/router'

// ** Material UI Imports
import { Box, CardMedia, FormControl, Grid, IconButton, InputAdornment, OutlinedInput } from '@mui/material'

// ** Material-UI Icons Imports
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag'
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer'

// ** Material Design Icons Imports
import Magnify from 'mdi-material-ui/Magnify'

// ** Layouts Imports
import UserDropdown from 'src/@core/layouts/components/shared-components/UserDropdown'
import NotificationDropdown from 'src/@core/layouts/components/shared-components/NotificationDropdown'

const AppBarContent = props => {
  // ** State สำหรับการค้นหา
  const [searchValue, setSearchValue] = useState('')

  // ** Router ของ Next.js
  const router = useRouter()

  // ** ฟังก์ชันสำหรับการค้นหา
  const handleSearch = value => {
    setSearchValue(value)
  }

  // ** ฟังก์ชันสำหรับการดำเนินการเมื่อกดปุ่มค้นหา
  const handleSearchSubmit = () => {
    if (searchValue.trim() !== '') {
      router.replace(`/category?keyword=${encodeURIComponent(searchValue)}`)
    }
  }

  return (
    <Box sx={{ width: '100%', height: '90px' }}>
      <Grid container justifyContent='space-between' alignItems='center' sx={{ height: '100%' }}>
        <Grid item xl={2} xs={2}>
          <Box sx={{ width: '42px' }}>
            <Link href='/' passHref>
              <CardMedia
                component='img'
                image='https://media.discordapp.net/attachments/1143783715877703833/1152162375529676861/tctm-logo.png?width=711&height=702'
                alt='logo'
              />
            </Link>
          </Box>
        </Grid>
        <Grid item xl={10} xs={10}>
          <Box sx={{ width: '100%' }}>
            <Grid container justifyContent='flex-end' alignItems='center' spacing={2}>
              <Grid item>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center'
                  }}
                >
                  <FormControl
                    fullWidth
                    variant='outlined'
                    sx={{ borderRadius: '12px', height: '40px', maxWidth: '250px', minWidth: '50px' }}
                  >
                    <OutlinedInput
                      size='small'
                      placeholder='Search Products...'
                      onChange={e => handleSearch(e.target.value)}
                      onKeyPress={e => {
                        if (e.key === 'Enter') handleSearchSubmit()
                      }}
                      startAdornment={
                        <InputAdornment position='start'>
                          <IconButton onClick={handleSearchSubmit} sx={{ marginLeft: { xs: -3 } }}>
                            <Magnify sx={{ color: 'text.primary' }} />
                          </IconButton>
                        </InputAdornment>
                      }
                      sx={{ borderRadius: '12px' }}
                    />
                  </FormControl>
                  <Link href='/member/ports/' passHref>
                    <IconButton>
                      <QuestionAnswerIcon sx={{ color: 'text.primary' }} />
                    </IconButton>
                  </Link>
                  <Link href='/member/order/myoder/' passHref>
                    <IconButton>
                      <ShoppingBagIcon sx={{ color: 'text.primary' }} />
                    </IconButton>
                  </Link>
                  <NotificationDropdown />
                  <UserDropdown />
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}

export default AppBarContent
