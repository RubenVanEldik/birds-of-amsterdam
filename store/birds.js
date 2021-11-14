export const state = () => ({
  all: null
})

export const mutations = {
  add(state, birds) {
    state.all = birds
  }
}

export const actions = {
  async get(context) {
    if (!context.state.birds) {
      // Fetch the birds
      const url = 'https://maps.amsterdam.nl/open_geodata/geojson_lnglat.php?KAARTLAAG=VOGELS&THEMA=vogels'
      const res = await fetch(url)
      const { features } = await res.json()

      // Add the birds to the store
      context.commit('add', features)
    }
  }
}
