export default class AppConfiguration {
  static readonly baseUrl =
    import.meta.env.VITE_BACKEND_API || 'https://defikarte-backend-staging.azurewebsites.net/api/';
  static readonly googleMapsDirectionsUrl = 'https://www.google.com/maps/dir/?api=1';
  static readonly baseLayerLocalStorageKey = 'ACTIVE_BASE_LAYER_ID';
  static readonly routes = ['home', 'knowledge', 'project', 'support'].map(key => {
    return { key: key, route: key === 'home' ? '/' : `/${key}` };
  });
}
