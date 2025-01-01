import React from 'react'
import Slider from '../components/Home/Slider'
import Notice from '../components/Home/Notice/Notice'
import Services from '../components/Home/Services/Services'
import WhyChose from '../components/Home/WhyChoose/WhyChose'
import Testimonial from '../components/Home/Testimonial/Testimonial'
import Marque from '../components/Home/Marque'
import { getDataHandler } from '../actions/users/getData'
import { getAllOpinion } from '../constans/constans'

export default async function HomePage() {
  // const { status, result } = await getDataHandler(getAllOpinion);
  const [testimonials] = await Promise.all([
    getDataHandler(getAllOpinion)
  ])


  return (
    <div className='bgGradient' >
      <Slider />
      <Marque />
      <Notice />
      <Services />
      <WhyChose />
      <Testimonial testimonialsData={testimonials} />


    </div>
  )
}
