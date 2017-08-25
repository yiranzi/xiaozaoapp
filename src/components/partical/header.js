import React from 'react';
import Head from 'next/head';

export default class Header extends React.Component {
    render() {
        return (
            <div>
                <Head>
                    <meta charSet="UTF-8"/>
                    <meta name="viewport" content="width=device-width, initial-scale=1"/>
                    <link rel="stylesheet" href="/static/css/antd.min.css"/>
                </Head>
            </div>
        );
    }
}