// Comment is using react-query code, if you want check this code, uncomment
// import { GetStaticProps } from 'next'
import React from 'react'
import { useQuery } from 'react-query'
import Layout from '~components/Layout'
import { api } from '~services/api'

const getCategoryNames = () => {
  return api({
    key: 'getCategories',
  })
}

const _static = ({ names }: any) => {
  const { isLoading, error, data }: any = useQuery('categoryNames', getCategoryNames, {
    initialData: names,
  })

  if (isLoading) return <h1>Now loading.....</h1>
  if (error) return <h1>Error!! {error.message}</h1>

  return (
    <Layout title="Api Test GET react-query | Next.js + TypeScript Example">
      <ul>
        {data.map((name: string, idx: number) => (
          <li key={idx}>{name}</li>
        ))}
      </ul>
    </Layout>
  )
}

/*export const getStaticProps: GetStaticProps = async () => {
  const response = await getCategoryNames()
  return {
    props: {
      names: response.data.map(
        (category: { [key: string]: any }) => category.descriptions.name || []
      ),
    },
  }
}*/

export default _static
