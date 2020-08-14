import React from 'react';
import PropTypes from 'prop-types';

import '../styles/vars.css';
import '../styles/global.css';
import '../styles/css/antd.css';

export default function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

MyApp.propTypes = {
  Component: PropTypes.any,
  pageProps: PropTypes.any,
};
