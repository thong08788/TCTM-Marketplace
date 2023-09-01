import Grid from '@mui/material/Grid'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Box, Button, Chip } from '@mui/material'
import { StyledDataGrid } from 'src/views/backoffice/styled'
import Swal from 'sweetalert2'

const Billboard = () => {
  const [Billboardlist, setBillboardlist] = useState([])

  useEffect(() => {
    axios.get('http://111.223.38.19/api/method/frappe.API.TCTM.backoffice.home_page.all_billboard').then(response => {
      console.log('setBillboardlist:', response.data.message.Data)
      setBillboardlist(response.data.message.Data)
    })
  }, [])

  useEffect(() => {
    fetchBillboardData()
  }, [])

  const fetchBillboardData = () => {
    axios
      .get('http://111.223.38.19/api/method/frappe.API.TCTM.backoffice.home_page.all_billboard')
      .then(response => {
        setBillboardlist(response.data.message.Data)
      })
      .catch(error => {
        console.error('Error:', error)
      })
  }

  const handleActiveClick = bill_id => {
    // ทำสิ่งที่คุณต้องการเมื่อคลิกปุ่ม Ban
    console.log(`Active account with ID ${bill_id}`)

    axios
      .post('http://111.223.38.19/api/method/frappe.API.TCTM.backoffice.home_page.active_bill_board', {
        bill_id
      })
      .then(response => {
        console.log('bill_id', response)
        // ทำอย่างอื่นตามความต้องการ
        fetchBillboardData()
      })
      .catch(error => {
        console.error('Error:', error)
      })
  }

  const handleUnactiveClick = bill_id => {
    // ทำสิ่งที่คุณต้องการเมื่อคลิกปุ่ม Unban
    console.log(`Unactive account with ID ${bill_id}`)

    axios
      .post('http://111.223.38.19/api/method/frappe.API.TCTM.backoffice.home_page.unactive_bill_board', {
        bill_id
      })
      .then(response => {
        console.log('UserID', response)
        // ทำอย่างอื่นตามความต้องการ
        fetchBillboardData()
      })
      .catch(error => {
        console.error('Error:', error)
      })
  }

  const handleDeleteClick = (bill_id) => {
    // ทำสิ่งที่คุณต้องการเมื่อคลิกปุ่ม Delete
    console.log(`Delete account with ID ${bill_id}`)
  }

  const handleUndeleteClick = (bill_id) => {
    // ทำสิ่งที่คุณต้องการเมื่อคลิกปุ่ม Undelete
    console.log(`Undelete account with ID ${bill_id}`)
  }

  return (
    <StyledDataGrid
      autoHeight
      rows={Billboardlist.map(val => ({ ...val, id: val.bill_id }))} // เพิ่มคุณสมบัติ id ในแต่ละแถว
      getRowId={bill_id => bill_id.id} // กำหนดให้ใช้คุณสมบัติ id เป็น id ของแถว
      columns={[
        { field: 'bill_id', headerName: 'ID', width: 120 },
        {
          field: 'bill_status',
          headerName: 'สถานะ',
          width: 120,
          renderCell: params => {
            const subStatus = params.value // ค่าที่อยู่ในช่อง "สถานะไอดี"
            let chipColor = 'default'
            let chipLabel = ''

            if (subStatus === '1') {
              chipColor = 'success'
              chipLabel = 'Active'
            } else if (subStatus === '0') {
              chipColor = 'error'
              chipLabel = 'Unactive'
            }

            return <Chip label={chipLabel} color={chipColor} />
          }
        },
        { field: 'bill_name', headerName: 'ชื่อป้าย', width: 200 },
        { field: 'name', headerName: 'คนสร้าง', width: 150 },
        { field: 'owner', headerName: 'ตำแหน่ง', width: 120 },
        {
          field: 'actions',
          headerName: 'ปุ่ม',
          width: 250, // ปรับขนาดตามความต้องการ
          renderCell: params => (
            <div>
              <Button
                variant='contained'
                color='success'
                className='btn btn-info'
                style={{ marginRight: '5px' }}
                onClick={() => {
                  if (params.row.bill_status !== '1') {
                    Swal.fire({
                      title: 'ต้องการที่จะแสดงรายการนี้ไหม?',
                      icon: 'question',
                      showCancelButton: true,
                      confirmButtonText: 'Active',
                      cancelButtonText: 'ยกเลิก'
                    }).then(result => {
                      if (result.isConfirmed) {
                        Swal.fire({
                          position: 'center',
                          icon: 'success',
                          title: 'แสดงเรียบร้อย',
                          showConfirmButton: false,
                          timer: 1500
                        })
                        handleActiveClick(params.row.bill_id)
                      }
                    })
                  } else {
                    Swal.fire({
                      title: 'ไม่สามารถแบนได้',
                      text: 'เนื่องจากสถานะถูกแบนแล้ว',
                      icon: 'error'
                    })
                  }
                }}
                disabled={params.row.bill_status === '1'}
              >
                Active
              </Button>

              <Button
                variant='contained'
                color='success'
                className='btn btn-info'
                style={{ marginRight: '5px' }}
                onClick={() => {
                  if (params.row.bill_status !== '2') {
                    Swal.fire({
                      title: 'คุณต้องการที่จะหยุดแสดงรายการนี้ไหม?',
                      icon: 'question',
                      showCancelButton: true,
                      confirmButtonText: 'Unactive',
                      cancelButtonText: 'ยกเลิก'
                    }).then(result => {
                      if (result.isConfirmed) {
                        handleUnactiveClick(params.row.bill_id)
                      }
                    })
                  } else {
                    Swal.fire({
                      title: 'ไม่สามารถยกเลิกการแบนได้',
                      text: 'เนื่องจากสถานะยืนยันแล้ว',
                      icon: 'error'
                    })
                  }
                }}
                disabled={params.row.bill_status === '0'} // ปิดปุ่มถ้า account_status เป็น 1 หรือ 2
              >
                Unactive
              </Button>
              {/* <Button
                  variant='contained'
                  color='success'
                  className='btn btn-info'
                  style={{ marginRight: '5px' }}
                  onClick={() => handleDeleteClick(params.row.account_id, params.row.member_id)}
                >
                  Delete
                </Button>
                <Button
                  variant='contained'
                  color='success'
                  className='btn btn-info'
                  style={{ marginRight: '5px' }}
                  onClick={() => handleUndeleteClick(params.row.account_id, params.row.member_id)}
                >
                  Undelete
                </Button> */}
            </div>
          )
        }
      ]}
    />
  )
}

export default Billboard
