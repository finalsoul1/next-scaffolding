import React from 'react'
import uniqId from 'uniqid'

const navItems = [
  {
    id: uniqId('nav_'),
    name: '홈',
    href: '/',
    prod: true,
  },
  {
    id: uniqId('nav_'),
    name: '트랙보기',
    href: '/tracks',
    prod: true,
  },
  {
    id: uniqId('nav_'),
    name: '구매한 음악',
    href: '/me/purchases',
    requiredAuth: true,
    prod: true,
  },
  {
    id: uniqId('nav_'),
    name: '라이선스',
    href: '/me/licenses?filter=all',
    requiredAuth: true,
    prod: true,
  },
  {
    id: uniqId('nav_'),
    name: '이용방법',
    href: '/how-it-works',
    prod: true,
  },
  {
    id: uniqId('nav_'),
    name: '블로그',
    href: '/blog',
    prod: true,
  },
]

const NavViewer = () => {
  return <div></div>
}

export default NavViewer
