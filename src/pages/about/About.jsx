import React from 'react'
import Navbar from '../../components/Navbar'
import Aboutus from '../../components/Aboutus'
import Testimonials from '../home/Testimonials'
import Aboutceo from '../../components/Aboutceo'
import Flbtn from "../../components/Flbtn"
import Team from '../../components/Teams'

const About = () => {
  return (
    <div>
        <Aboutus/>
        <Team/>
        <Aboutceo/>
        <Testimonials/>
        <Flbtn/>
    </div>
  )
}

export default About