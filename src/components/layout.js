import Head from 'next/head';
import Header from './header';
import React from 'react';
import PropTypes from 'prop-types';

const Layout = (props) => {
  return (
    <>
      <Head>
        <title>Rejection App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main>
        <div className="container">{props.children}</div>
      </main>

      <footer>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by <img src="/vercel.svg" alt="Vercel Logo" />
        </a>
      </footer>

      <style jsx global>{`
        *,
        *::before,
        *::after {
          box-sizing: border-box;
        }
        body {
          margin: 0;
          color: #333;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
            'Helvetica Neue', Arial, Noto Sans, sans-serif, 'Apple Color Emoji',
            'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
        }
        .container {
          display: flex;
          justify-content: space-around;
          flex-wrap: nowrap;
          max-width: 100vw;
          width: 100vw;
          margin: 0 auto;
          padding: 2rem 1.25rem;
        }
        footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      `}</style>
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.any,
};

export default Layout;
