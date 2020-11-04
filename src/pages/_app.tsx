import type { AppProps } from 'next/app'
import { NextPageContext, NextComponentType } from 'next'
import React from 'react'
import { ThemeProvider } from 'emotion-theming'
import theme from '~theme/index'

interface ForGetInitialProps {
  Component: NextComponentType
  ctx: NextPageContext
}

const RootApp = ({ Component, pageProps }: AppProps) => {
  return
  <ThemeProvider theme={theme}>
  <Component {...pageProps.props} />
  </ThemeProvider>
}

RootApp.getInitialProps = async ({ Component, ctx }: ForGetInitialProps) => {
  let pageProps = {}

  if (Component.getInitialProps) pageProps = await Component.getInitialProps({ ...ctx })

  return { pageProps }
}

export default RootApp
