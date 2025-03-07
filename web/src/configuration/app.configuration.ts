export default class AppConfiguration {
  static readonly baseUrl =
    import.meta.env.VITE_BACKEND_API ||
    "https://defikarte-backend-staging.azurewebsites.net/api/";
}
