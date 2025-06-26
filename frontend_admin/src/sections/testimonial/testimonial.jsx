import {
  Routes, Route, Header, ContentTestimonial
} from '../../import'

function Testimonial() {
  return (
    <div className='relative min-h-full'>
      <Header head="Testimonial" />
      <Routes>
        <Route exact path='/' element={<ContentTestimonial />} ></Route>
      </Routes>
    </div>
  )
}

export default Testimonial