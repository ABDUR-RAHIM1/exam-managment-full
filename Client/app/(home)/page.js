
import React from 'react'
import Slider from '../components/Home/Sliders/Slider'
import Notice from '../components/Home/Notice/Notice'
import Services from '../components/Home/Services/Services'
import WhyChose from '../components/Home/WhyChoose/WhyChose'
import Testimonial from '../components/Home/Testimonial/Testimonial'
import Marque from '../components/Home/Marque'
import QuicLink from '../components/Home/Notice/QuicLink'
import ChatBox from '../components/Globals/ChatBox'
import NoticeModal from '../helpers/NoticeModal'

export default function HomePage() {

  return (
    <div className='bgGradient relative' >
      <Slider />
      <Marque />
      <Notice />
      <Services />
      <WhyChose />
      <div className=' block md:hidden w-full md:w-[28%] max-h-[500px] overflow-y-auto sidebar-scrollbar p-4 border-0 md:border-l border-gray-400'>
        <QuicLink />
      </div>
      <Testimonial />
      <NoticeModal />
    </div>
  )
}
