import React from 'react'
import {assets} from '../../assets/assets'
import './Footer.css'

const Footer = () => {
  return (
    <div id='footer' className='footer'>
        <div className='footer-content'>
            <div className="footer-content-left">
                <h2><img src={assets.logo} alt="logo" /></h2>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio tenetur aliquam neque excepturi commodi labore obcaecati ratione iste reprehenderit odio?</p>
                <div className="footer-social-icon">
                    <img src={assets.facebook_icon} alt="fb" />
                    <img src={assets.twitter_icon} alt="twitter" />
                    <a href="https://www.linkedin.com/in/paras-kumar-11a7ba2a8/" target='_blank'><img src={assets.linkedin_icon} alt="linkedin" /></a>
                </div>
            </div>
            <div className="footer-content-center">
                <h2>COMPANY</h2>
                <ul>
                    <li>Home</li>
                    <li>About Us</li>
                    <li>Contact Us</li>
                    <li>Privacy Policy</li>
                </ul>
            </div>
            <div className="footer-content-right">
                <h2>GET IN TOUCH</h2>
                <ul>
                    <li>+1-232-234-2343</li>
                    <li>paras@uiet.com</li>
                </ul>
            </div>
        </div>
        <hr />
        <p>�� 2025 Paras Library Application. All rights reserved.</p>
    </div>
  )
}

export default Footer