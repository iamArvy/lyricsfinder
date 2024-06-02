import axios from 'axios';
const state = {
  charts: null,
    accessToken: null,
    loaded: false,
    searchstate: null,
    trackstate: null,
    lyricstate: null,
    downloadstate: null,
    albumstate: null,
    artiststate: null,
    recommendation: null,
    newalbum: null,
    artistalbum: null,
    artisttop: null
  };
const getters = {
    recommendationgetter:() => {
      const data = state.recommendation
      return data
    },
    albcharts: (state) => {
      const data = state.charts
      const dataObject = data.chart_items
      return dataObject;
    },
    artistalbumgetter:() => {
      const data = state.artistalbum
      return data
    },
    artisttopgetter:() => {
      const data = state.artisttop
      return data
    },
    newalbumgetter:(state) => {
      const mdata = state.newalbum
      const dataObject = mdata
      return dataObject;
    },
    trackresult: (state) => {
      const data = state.searchstate
      const dataObject = data.tracks.items
      return dataObject
    },
    albumresult: (state) => {
      const data = state.searchstate
      const dataObject = data.albums.items
      return dataObject
    },
    artistresult: (state) => {
      const data = state.searchstate
      const dataObject = data.artists.items
      return dataObject
    },
    trackgetter: (state) => {
      const data = state.trackstate
      return data;
    },
    lyricsgetter: (state) => {
      const data = state.lyricstate
      const dataObject = data.lyrics.lines
      return dataObject;
    },
    albumgetter: (state) => {
      const data = state.albumstate
      return data;
    },
    artistgetter: (state) => {
      const data = state.artiststate
      return data;
    },
    downloadgetter:(state) => {
      const data = state.downloadstate
      const dataObject = data.audio
      return dataObject
    }
};
const mutations = {
  setCharts(state, result){
    state.charts = result
},
  setAccessToken(state, token) {
      state.accessToken = token;
  },
  setData(state, result){
    state.loaded = result
  },
  setArtistalbum(state, result){
    state.artistalbum = result
  },
  setArtisttop(state, result){
    state.artisttop = result
  },
  setNewalbum(state, result){
    state.newalbum = result
  },
  setRecommendation(state, result){
    state.recommendation = result
  },
  setSearchstate(state, result){
    state.searchstate = result
  },
  setTracks(state, result){
    state.trackstate = result
  },
  setLyrics(state, result){
    state.lyricstate = result
  },
  setDownload(state, result){
    state.downloadstate = result
  },
  setAlbum(state, result){
      state.albumstate = result
  },
  setArtist(state, result){
      state.artiststate = result
  },
};
const actions = {
  async charts({commit}) {
    try {
      // const { key } = await dispatch('getAuthdetails')
        const options = await axios.get('https://genius-song-lyrics1.p.rapidapi.com/chart/songs/', {
            params: {time_period: 'day', per_page: '20', page: '1'},
            headers: {
                'X-RapidAPI-Key': '073319e51emshf395f17a0ef0467p1a45a0jsn775ff17f94b1',
                'X-RapidAPI-Host': 'genius-song-lyrics1.p.rapidapi.com',
            }
        })
        commit('setCharts', options.data)
        commit('setData', true)
    }
    catch(error) {
        console.error(error);
}
},
  async getRecommendation({commit, dispatch}, id){
    try{
      let token = await dispatch('getToken');
      if (token) {
          let response = await axios.get(`https://api.spotify.com/v1/recommendations?seed_tracks=${id}`,{
          headers: {
              'Authorization': `Bearer ${token}`
          }
      })
      commit('setRecommendation', response.data.tracks);
        } else {
          console.error('Access token not found in state');
        }
    }catch(error){
      console.error(error)
    }
  },
  async getNewalbum({commit, dispatch}){
    try{
      let token = await dispatch('getToken');
      if (token) {
          let response = await axios.get('https://api.spotify.com/v1/browse/new-releases',{
          headers: {
              'Authorization': `Bearer ${token}`
          }
      })
      commit('setNewalbum', response.data.albums.items);
        } else {
          console.error('Access token not found in state');
        }
    }catch(error){
      console.error(error)
    }
  },
  async getArtistalbum({commit, dispatch}, id){
    try{
      let token = await dispatch('getToken');
      if (token) {
          let response = await axios.get(`https://api.spotify.com/v1/artists/${id}/albums`,{
          headers: {
              'Authorization': `Bearer ${token}`
          }
      })
      commit('setArtistalbum', response.data.items);
        } else {
          console.error('Access token not found in state');
        }
    }catch(error){
      console.error(error)
    }
  },
  async getArtisttop({commit, dispatch}, id){
    try{
      let token = await dispatch('getToken');
      if (token) {
          let response = await axios.get(`https://api.spotify.com/v1/artists/${id}/related-artists`,{
          headers: {
              'Authorization': `Bearer ${token}`
          }
      })
      commit('setArtisttop', response.data.artists);
        } else {
          console.error('Access token not found in state');
        }
    }catch(error){
      console.error(error)
    }
  },
  async getAuthdetails(){
    try {
      let authdetails = await axios.get('https://vorteks.pythonanywhere.com/api/detail')
      let dataDict = {}
      for (const item of authdetails.data){
        dataDict[item.name] = item.detail;
      }
      const key = dataDict['key']
      const client_id = dataDict['spotifyid']
      const client_secret = dataDict['spotifykey']
      const details = {
        client_id,
        client_secret,
        key
      }
      return details
      }catch(error) {
        console.error(error);
    }
  },
  async getToken({ dispatch }) {
      try {
          const authdetails = await dispatch('getAuthdetails')
          const { client_id } = authdetails
          const { client_secret } = authdetails
          const auth_string = client_id + ':' + client_secret;
          const auth_bytes = new TextEncoder().encode(auth_string);
          const auth_base64 = btoa(String.fromCharCode.apply(null, auth_bytes));
          const adata = new URLSearchParams();
          adata.append('grant_type', 'client_credentials');
          const response = await fetch('https://accounts.spotify.com/api/token',{
            method: 'POST',
            headers: {
                'Authorization': 'Basic ' + auth_base64,
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: adata,
          });
          const data = await response.json();
          const accessToken = data.access_token;
          return accessToken
      } catch (error) {
        console.error('Login Error', error);
      }
  },
  async getLyrics({commit, dispatch}, id){
    try{
      const { key } = await dispatch('getAuthdetails')
      const options = await axios.get('https://spotify23.p.rapidapi.com/track_lyrics/',{
          params: {id:id},
          headers: {
              'X-RapidAPI-Key': key,
              'X-RapidAPI-Host': 'spotify23.p.rapidapi.com',
          }
      })
      commit('setLyrics', options.data)
    }catch(error) {
      console.error(error);
    }
  },
  async getArtist({commit, dispatch}, id){
    try{
      let token = await dispatch('getToken');
      if (token) {
          const response = await axios.get(`https://api.spotify.com/v1/artists/${id}`,{
            headers: {
              'Authorization': `Bearer ${token}`,
            }
          });
          commit('setArtist', response.data);
        } else {
          console.error('Access token not found in state');
        }
    }
    catch(error) {
      console.error(error);
    }
  },
  async getAlbuminfo({commit, dispatch}, id){
    try{
      let token = await dispatch('getToken');
      if (token) {
          const response = await axios.get(`https://api.spotify.com/v1/albums/${id}`,{
            headers: {
              'Authorization': `Bearer ${token}`,
            }
          });
          commit('setAlbum', response.data);
        } else {
          console.error('Access token not found in state');
        }
    }
    catch(error) {
      console.error(error);
    }
  },
  async getTrackinfo({commit, dispatch}, id){
    try{
      const token = await dispatch('getToken');
            if (token) {
                const options = await axios.get(`https://api.spotify.com/v1/tracks/${id}`, {
                  // params: { id: id },
                  headers: {
                    'Authorization': `Bearer ${token}`,
                  }
                });
                commit('setTracks', options.data);
                const alid = options.data.album.id
                await dispatch ('getAlbuminfo',alid)
              } else {
                await dispatch('getToken');
                console.error('Access token not found in state');
              }
    }
    catch(error) {
      console.error(error);
    }
  },
  async tracks({commit, dispatch}, id){
    try {
      await dispatch('getLyrics', id)
      await dispatch('getTrackinfo', id)
      await dispatch('getRecommendation', id)
      commit('setData', true)
    }
    catch(error) {
      console.error(error);
    }
  },
  async albums({commit, dispatch}, id){
    try{
      await dispatch('getAlbuminfo', id)
      await dispatch('getNewalbum', id)
      commit('setData', true)
    }catch(error){
      console.error(error)
    }
  },
  async artist({commit, dispatch}, id){
    try{
      await dispatch('getArtist', id)
      await dispatch('getArtistalbum', id)
      await dispatch('getArtisttop', id)
      commit('setData', true)
    }catch(error){
      console.error(error)
    }
  },
  async search({commit, dispatch,}, query) {
      try {
        const token = await dispatch('getToken');
          if (token) {
              const options = await axios.get(`https://api.spotify.com/v1/search`, {
                params: { q: query, type: 'track,album,artist', limit: '15' },
                headers: {
                  'Authorization': `Bearer ${token}`,
                }
              });
              commit('setSearchstate', options.data);
              commit('setData', true);
            }
      }
      catch(error) {
          console.error(error);
  }
  },
  async downloader({commit, dispatch}, id){
    try{
      const { key } = await dispatch('getAuthdetails')
      const download = await axios.get('https://spotify-downloader3.p.rapidapi.com/spotify/download/',{
            params: {url:'https://open.spotify.com/track/'+id},
            headers: {
                'X-RapidAPI-Key': key,
                'X-RapidAPI-Host': 'spotify-downloader3.p.rapidapi.com',
            }
        })
        commit('setDownload', download.data)
        commit('setData', true)
    }catch(error){
      console.error(error)
    }
  },
  async landing({commit, dispatch}){
    try{
      await dispatch('getNewalbum')
      await dispatch('charts')
      commit('setData', true)
    }catch(error){
      console.error(error)
    }
  }
}


export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
  };
  