import type { AppProps } from 'next/app'
import { NextPageContext, NextComponentType } from 'next'
import React from 'react'

const RootApp = ({ Component, pageProps }: AppProps) => {
  return <Component {...pageProps} />
}

RootApp.getInitialProps = async ({ Component, ctx }) => {
  let pageProps = {}

  if (Component.getInitialProps) pageProps = await Component.getInitialProps(ctx)

  return { pageProps }
}

export default RootApp
