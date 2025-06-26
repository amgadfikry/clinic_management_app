import {
  Routes, Route, Header, ContentAppointment
} from '../../import'

function Appointment() {
  return (
    <div className='relative min-h-full'>
      <Header head="Appointments" />
      <Routes>
        <Route exact path='/' element={<ContentAppointment />} ></Route>
      </Routes>
    </div>
  )
}

export default Appointment