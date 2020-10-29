import React, { useEffect } from 'react'
import Layout from '~components/Layout'
import { api } from '~services/api'

const clientSide = ({ name }: any) => {
  useEffect(() => {
    const getProductData = async () => {
      await api({
        key: 'getProduct',
        data: {
          id: 1278016,
        },
      })
    }
    console.log('in client-side', getProductData())
  }, [])

  return (
    <Layout title="Api Test on ClientSide">
      <p>
        Get product name is <span style={{ fontWeight: 'bold', color: 'blue' }}>{name}</span>
      </p>
    </Layout>
  )
}

export default clientSide
