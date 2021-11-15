export const state = () => ({
  data: null,
  species: [
    {
      name: 'Gierzwaluw',
      color: '#B91C1C',
      show: true
    },
    {
      name: 'Boerenzwaluw',
      color: '#D97706',
      show: true
    },
    {
      name: 'Huiszwaluw',
      color: '#9D174D',
      show: true
    },
    {
      name: 'Huismus',
      color: '#059669',
      show: true
    },
    {
      name: 'Spreeuw',
      color: '#2563EB',
      show: true
    }
  ]
})

export const mutations = {
  add (state, data) {
    state.data = data
  },
  toggleSpecies (state, speciesName) {
    const species = state.species.find(({ name }) => name === speciesName)
    species.show = !species.show
  }
}

export const getters = {
  countOfSpecies: state => (speciesName) => {
    // Return a dash when the data has not been loaded yet
    if (!state.data) {
      return '-'
    } else if (speciesName) {
      // Return the count of the species when a species name has been provided
      return state.data?.features
        .filter(({ properties }) => properties.Vogel === speciesName)
        .length
    } else {
      // Return the total count of all species currently shown when no species name is given
      return state.species
        .filter(({ show }) => !!show)
        .reduce((total, { name }) => {
          return total + state.data?.features
            .filter(({ properties }) => properties.Vogel === name)
            .length
        }, 0)
    }
  }
}

export const actions = {
  async get (context) {
    if (!context.state.birds) {
      // Fetch the birds
      const url = 'https://maps.amsterdam.nl/open_geodata/geojson_lnglat.php?KAARTLAAG=VOGELS&THEMA=vogels'
      const res = await fetch(url)
      const data = await res.json()

      // Add the birds to the store
      context.commit('add', data)
    }
  }
}
