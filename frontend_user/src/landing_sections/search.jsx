/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import {
  SearchBar, SectionHeader, useState, SearchResults, useEffect
} from '../import'

function Search({ doctorsData }) {
  const [data, setData] = useState([])

  useEffect(() => {
    setData(doctorsData)
  }, [doctorsData])

  return (
    <section className="py-16 px-2 bg-gray-color" id='search'>
      <div className="container mx-auto">
        <SectionHeader span="Explore our" title="Doctors"
          paragraph="Search for best doctors among diffrent specialilties." span2='' />
        <SearchBar data={data} setData={setData} doctorsData={doctorsData} />
        <SearchResults data={data} />
      </div>
    </section>
  )
}

export default Search