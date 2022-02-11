import React from 'react';
import "./_Footer.scss"
import { Button } from '../../components/Buttons/Buttons';

const Footer = ({menu,logoDesktop,logoMobile}) => {

  const Logo = ()=>{
    return (
      <div>
           <img className='logo' src={logoDesktop} />
          
      </div>
    )
  }


  return ( 
    <div className='footer-nav'>
      <Logo/>
      

    <div>
    {
        menu.map((item,idx)=>{
          return <a key ={idx} href={item.url}>{item.name}</a>
        })
      }

    </div>
    <div >
      <Button color="primary" href="https://www.google.com" color="">Donate</Button>
    </div>

     

    </div>
   );
}
 
export default Footer;