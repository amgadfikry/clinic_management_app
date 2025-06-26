import {
  SectionHeader, BiLogoSlack, BiLogoReact, BiLogoMastodon, BiLogoMicrosoftTeams, BiLogoMagento
} from '../import'

const insuranceCompanies = [
  { 'id': 1, 'logo': <BiLogoSlack />, 'name': 'MedNet' },
  { 'id': 2, 'logo': <BiLogoReact />, 'name': 'MedCare' },
  { 'id': 3, 'logo': <BiLogoMastodon />, 'name': 'AlphaCare' },
  { 'id': 4, 'logo': <BiLogoMicrosoftTeams />, 'name': 'Shefaa' },
  { 'id': 5, 'logo': <BiLogoMagento />, 'name': 'Sehaa' },
]

function Insurance() {
  return (
    <section className="pt-16 pb-12 px-2 bg-gray-color">
      <div className="container mx-auto ">
        <SectionHeader span='Insurance' title='Companies'
          paragraph='Diffrent insurance companies with our clinic' />
        <div className='flex items-center justify-center space-x-5 md:space-x-12 flex-wrap'>
          {insuranceCompanies.map((company) => {
            return (
              <div className="flex flex-col items-center opacity-80 mb-5  text-dark-color" key={company.id}>
                <div className='text-4xl ls:text-5xl'>
                  {company.logo}
                </div>
                <h4 className='text-light text-base lg:text-lg'>{company.name}</h4>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Insurance