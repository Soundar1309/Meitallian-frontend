import React from 'react'
import Navbar from '../../components/Navbar'
import Aboutus from '../../components/Aboutus'
import Testimonials from '../home/Testimonials'
import Aboutceo from '../../components/Aboutceo'

const About = () => {
  return (
    <div>
        <Aboutus/>
        <Aboutceo/>
        <Testimonials/>
    </div>
  )
}

export default About