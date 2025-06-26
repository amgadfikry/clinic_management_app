import {
  Routes, Route, ContentOffer, CreateOffer, EditOffer, Header
} from '../../import'

function Offers() {
  return (
    <div className='relative min-h-full'>
      <Header head="Offers" />
      <Routes>
        <Route exact path='/' element={<ContentOffer />} ></Route>
        <Route exact path='create' element={<CreateOffer />} ></Route>
        <Route exact path='edit/:name' element={<EditOffer />} ></Route>
      </Routes>
    </div>
  )
}

export default Offers