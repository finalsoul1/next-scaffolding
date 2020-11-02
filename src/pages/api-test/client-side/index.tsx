import React, { useEffect } from 'react'
import Layout from '~components/Layout'
import { api } from '~services/api'

const clientSide = ({ name }: any) => {
  useEffect(() => {
    const getProductData = async () => {
      try {
        return await api({
          key: 'getProduct',
          data: {
            id: 1278016,
          },
        })
      } catch (error) {
        console.error(error)
        throw error
      }
    }
    getProductData().then((res) => console.log(res))
  }, [])

  return (
    <Layout title="Api Test on ClientSide">
      <p>
        Get product name is
        <span style={{ fontWeight: 'bold', color: 'blue' }}>{name}</span>
      </p>
    </Layout>
  )
}

export default clientSide
