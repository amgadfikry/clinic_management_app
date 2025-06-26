/* eslint-disable no-unused-vars */
import {
  Routes, Route, ContentSpeciality, CreateSpeciality, EditSpeciality, Header
} from '../../import'

function Specialities() {

  return (
    <div className='relative min-h-full'>
      <Header head="Specialities" />
      <Routes>
        <Route exact path='/' element={<ContentSpeciality />} ></Route>
        <Route exact path='create' element={<CreateSpeciality />} ></Route>
        <Route exact path='edit/:name' element={<EditSpeciality />} ></Route>
      </Routes>
    </div>
  )

}

export default Specialities