/* eslint-disable react/prop-types */
import {
  DoctorCard, useState, MdNavigateNext, MdNavigateBefore
} from '../import'

function SearchResults({ data }) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(data.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  const handleNextPage = () => {
    if (currentPage < Math.ceil(data.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }

  const handlePageChange = (event) => {
    setCurrentPage(Number(event.target.id));
  };

  return (
    <div className='py-10'>
      {data.length > 0
        ? <div className='flex flex-col'>
          {currentItems.map((doctor) => <DoctorCard doctor={doctor} key={doctor.id} />)}
        </div>
        : <div className='flex flex-col items-center justify-center text-center text-dark-color mt-6'>
          <p className='font-[500] text-2xl'>No results found</p>
          <p className='font-[300] text-lg'>Try to change your search criteria</p>
        </div>
      }
      <ul className="pagination flex justify-center items-center space-x-1 mt-3 text-dark-color">
        <li>
          <MdNavigateBefore className='text-3xl cursor-pointer hover:-translate-x-1 transition-all duration-300 mr-2'
            onClick={handlePreviousPage} />
        </li>
        {pageNumbers.map(number => (
          <li className={`py-1 px-2 rounded-md cursor-pointer text-dark-color border
          ${number === currentPage ? 'text-white bg-teal-color border-teal-color' : 'border-dark-color '}`}
            key={number} id={number} onClick={handlePageChange}>
            {number}
          </li>
        ))}
        <li>
          <MdNavigateNext className='text-3xl cursor-pointer hover:translate-x-1 transition-all duration-300 ml-2' onClick={handleNextPage} />
        </li>
      </ul>
    </div>
  );
}

export default SearchResults