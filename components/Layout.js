// components/Layout.js
import React from 'react';
import Head from 'next/head';

const Layout = ({ children }) => (
  <>
    <Head>
      <title>DeFiChain Grants Walkthrough</title>
    </Head>
    <div className="container">
      {children}
    </div>
    <style jsx global>{`
      body {
        margin: 0;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        background-color: #f9f9f9;
        color: #333;
      }
      .container {
        max-width: 800px;
        margin: auto;
        padding: 20px;
      }
    `}</style>
  </>
);

export default Layout;

