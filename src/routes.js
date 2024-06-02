import LandingPage from "./components/Landing/LandingPage.vue";
import TrackPage from "./components/Track/TrackPage.vue";
import SearchResult from "./components/Search/SearchResult.vue";
import AlbumPage from "./components/Album/AlbumPage.vue";
import ArtistPage from "./components/Artist/ArtistPage.vue";
const routes=[
    {
        name:'Home',
        path: "/",
        component: LandingPage,
        meta: {title: 'Home'}
    },
    {
        name: 'TrackPage',
        path: "/track",
        component: TrackPage,
        meta: {title: 'Track'}
    },
    {
        name: 'SearchResult',
        path: "/searchresult",
        component: SearchResult,
        meta: {title: 'Search'}
    },
    {
        name: 'ArtistPage',
        path: "/artist",
        component: ArtistPage,
        meta: {title: 'Artist'}
    },
    {
        name: 'AlbumPage',
        path: "/album",
        component: AlbumPage,
        meta: {title: 'Album'}
    }
];


export default routes;
