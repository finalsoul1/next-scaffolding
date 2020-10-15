import { GetServerSideProps } from 'next'
import React from 'react'
import Layout from '~components/Layout';
import { api } from '~services/api'

const get = ({ name }: any) => {
  // use swr here
  return (
    <Layout title="Api Test GET | Next.js + TypeScript Example">
      <p>Get product name is <h1>{name}</h1> by API</p>
    </Layout>
  )
}

// useSwr 은 클라이언트에서 hooks 로 처리 하고 싶을 때 ex) 특정 이벤트 시 CRUD
// server-side-rendering 은 로드되기 전에 미리 불러와야 할 데이터들에 대하여.
export const getServerSideProps: GetServerSideProps = async () => {
  // use api here
  // response has {status, data}
  const response = await api({
    'key': 'getProduct',
    'data': {
      'id': 1278016,
    },
  })

  return {
    props: {
      name: response.data.descriptions.name || '',
    },
  }
}

export default get
