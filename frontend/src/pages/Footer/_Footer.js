import React from 'react';
import "./_Footer.scss"

const Footer = ({menu}) => {
  return ( 
    <div className='footer-nav'>
      {
        menu.map((item,idx)=>{
          return <a key ={idx} href={item.url}>{item.name}</a>
        })
      }

    </div>
   );
}
 
export default Footer;