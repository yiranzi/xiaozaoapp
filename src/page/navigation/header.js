import React from 'react';

const Header = ({title, children}) =>
  <section className='block'>
    <header>{title}</header>
    {children}
    <style jsx>{`
      .block {
            margin:10px 20px;
          }
          header {
            background-color:#F4F6FA;
            color:#838589;
            margin-top:10px;
            padding:5px 0px 5px 15px;
            border-radius:10px;
            border:1px solid #BFBFBF;
          }
    `}</style>
  </section>;

export default Header;
