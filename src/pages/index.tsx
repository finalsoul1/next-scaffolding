import React from 'react'
import Link from 'next/link'
import Layout from '~components/Layout'

const IndexPage = () => (
  <Layout title="Home | Next.js + TypeScript Example">
    <h1>Hello Next.js </h1>
    <span role="img" aria-label="Panda">
      👋
    </span>
    <p>
      <Link href="/about">
        <a href="/#">About</a>
      </Link>
    </p>
  </Layout>
)

export default IndexPage
