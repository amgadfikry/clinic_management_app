/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import {
  useState, useEffect, Link, MdNavigateNext, MdNavigateBefore
} from '../import';

function DoctorDateMonthly({ times, doctor }) {
  const [datesForSpecificDays, setDatesForSpecificDays] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = datesForSpecificDays.slice(indexOfFirstItem, indexOfLastItem);
  const daysList = times

  const handleNextPage = () => {
    if (currentPage < Math.ceil(datesForSpecificDays.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }

  function getDatesForSpecificDays(daysList) {
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const today = new Date();
    const dates = [];
    let i = 0
    while (i < 30) {
      daysList.forEach((day) => {
        const dayIndex = daysOfWeek.indexOf(day.day);
        if (today.getDay() === dayIndex) {
          const dateData = {
            day: day.day,
            start: day.start,
            end: day.end,
            date: today.getDate(),
            month: today.getMonth() + 1,
            year: today.getFullYear(),
          };
          dates.push(dateData);
        }
      });
      const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
      const lastMonthOfTheYear = 11;
      if (today.getMonth() === lastMonthOfTheYear && today.getDate() === lastDayOfMonth) {
        today.setFullYear(today.getFullYear() + 1);
        today.setMonth(0);
        today.setDate(1);
      } else if (today.getDate() === lastDayOfMonth) {
        today.setMonth(today.getMonth() + 1);
        today.setDate(1);
      } else {
        today.setDate(today.getDate() + 1);
      }

      i++
    }
    return dates;
  }

  useEffect(() => {
    const dates = getDatesForSpecificDays(daysList);
    setDatesForSpecificDays(dates);
  }, []);

  return (
    <div className='py-3 px-2 '>
      {datesForSpecificDays.length > 0 ? (
        <div className=' flex justify-center items-center text-dark-color transition-all duration-300' >
          <MdNavigateBefore className='text-3xl cursor-pointer hover:-translate-x-1 transition-all duration-300 mr-2' onClick={handlePreviousPage} />
          {currentItems.map((date, index) => (
            <div className='flex flex-col mr-2 rounded-lg overflow-hidden border bg-gray-color drop-shadow-md' key={index}>
              <p className=' text-sm bg-teal-color text-white p-1' id={`${date.year}-${date.month}-${date.date}`} >
                {`${date.date}/${date.month}/ ${date.day.slice(0, 3)}`}
              </p>
              <div className='flex flex-col p-1 items-center py-2'>
                <p className=' text-sm mb-2'>{date.start < 10 ? '0' + date.start + ':00' : date.start + ':00'}</p>
                <p className=' text-sm mb-2'>to</p>
                <p className=' text-sm'>{date.end < 10 ? '0' + date.end + ':00' : date.end + ':00'}</p>
              </div>
              <Link to={`/dashboard/makeappointment/${doctor.id}`}
                state={[doctor, `${date.day} ${date.date}/${date.month}/${date.year} ${date.start < 10 ? '0' + date.start + ':00' : date.start + ':00'}`]}>
                <p className='text-sm text-white bg-teal-color transition-all duration-300 cursor-pointer hover:bg-dark-color
                p-1 text-center'>book</p>
              </Link>
            </div>
          ))}
          <MdNavigateNext className='text-3xl cursor-pointer hover:translate-x-1 transition-all duration-300' onClick={handleNextPage} />
        </div>

      ) : (
        <div className=' text-center text-gray-300 mt-6 px-4'>
          <p className='font-[500] text-2xl'>No current dates</p>
        </div>
      )}
    </div>
  );
}

export default DoctorDateMonthly;
