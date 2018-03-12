var select = require('./index.js')

var obj = {
  type: 'person',
  info: {
    name: 'ian',
    surname: 'jorgensen',
    dob: {
      month: 'september',
      year: '1984',
      day: '12'
    },
    countries: [
      {
        country: 'argentina',
        city: 'buenos aires'
      },
      {
        country: 'uk',
        city: 'london'
      },
      {
        country: 'denmark',
        city: 'copenhagen'
      }
    ]
  }
}

var map = {
  type : 'type',
  name: 'info.name',
  surname: 'info.surname',
  month: 'info.dob.month',
  missing: 'info.address.street',
  firstCountry: 'info.countries[0].country',
  firstCity: ['info.countries[0].country.city', 'info.countries[0].city'],
  firstCityMissing: ['info.countries[0].country.city', 'info.countries[0].none']
}

select(map, './test-data/**/*.json', console.log)
