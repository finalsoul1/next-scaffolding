import { GetServerSideProps } from 'next'
import React from 'react'
import Layout from '~components/Layout';
import { api } from '~services/api'

const get = ({ name }: any) => {
  console.log(name)
  return (
    <Layout title="Api Test GET | Next.js + TypeScript Example">
      <p>Get product name is <span>{name}</span></p>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  // response has { status, data }

  const response = await api({
    key: 'getProduct',
    data: {
      id: 1278016,
    },
  })
  // const response = await api({
  //   key: 'getCategories',
  // })
  // console.log(response)

  return {
    props: {
      name: response.data.descriptions.name || '상품명',
    },
  }
}

export default get
