/* eslint-disable react/jsx-no-undef */
import React from 'react'
import Banner from '../../components/Banner'
import SpecialDishes from './SpecialDishes'
import Testimonials from './Testimonials'
import OurServices from './OurServices'
import Flbtn from "../../components/Flbtn"
import Adplacement from '../../components/Adplacements'

const Home = () => {
  return (
    <div>
      <Banner />
      <SpecialDishes />
      <Adplacement />
      <Testimonials />
      <OurServices />
      <Flbtn />
    </div>
  )
}

export default Home