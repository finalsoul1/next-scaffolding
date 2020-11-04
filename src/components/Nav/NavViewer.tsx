import React from 'react'
import { Heading, Flex } from 'rebass'
import styled from '@emotion/styled'
// import uniqId from 'uniqid'

// const navItems = [
//   {
//     id: uniqId('nav_'),
//     name: '홈',
//     href: '/',
//     prod: true,
//   },
//   {
//     id: uniqId('nav_'),
//     name: '트랙보기',
//     href: '/tracks',
//     prod: true,
//   },
//   {
//     id: uniqId('nav_'),
//     name: '구매한 음악',
//     href: '/me/purchases',
//     requiredAuth: true,
//     prod: true,
//   },
//   {
//     id: uniqId('nav_'),
//     name: '라이선스',
//     href: '/me/licenses?filter=all',
//     requiredAuth: true,
//     prod: true,
//   },
//   {
//     id: uniqId('nav_'),
//     name: '이용방법',
//     href: '/how-it-works',
//     prod: true,
//   },
//   {
//     id: uniqId('nav_'),
//     name: '블로그',
//     href: '/blog',
//     prod: true,
//   },
// ]
const NavBox = styled(Flex)`
  width: 18%;
  min-width: 300px;
`

const NavViewer = () => {
  return (
    <NavBox p={2} bg="gray.2">
      <Heading fontSize={5}>
        dosan <br />
        seoulstore <br />
        admin
      </Heading>
    </NavBox>
  )
}

export default NavViewer
