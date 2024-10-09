export const navigate = (value: string, route: string, params: string): void => {
  const baseURL = `/${route}`
  const urlWithQuery = `${baseURL}?${params}=${value}`
  window.location.href = urlWithQuery
}
