import type { AppProps } from 'next/app'
import { NextPageContext, NextComponentType } from 'next'
import React from 'react'

interface ForGetInitialProps {
  Component: NextComponentType
  ctx: NextPageContext
}

const RootApp = ({ Component, pageProps }: AppProps) => {
  return <Component {...pageProps.props} />
}

RootApp.getInitialProps = async ({ Component, ctx }: ForGetInitialProps) => {
  let pageProps = {}

  if (Component.getInitialProps) pageProps = await Component.getInitialProps(ctx)

  return { pageProps }
}

export default RootApp
