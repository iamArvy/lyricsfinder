export const navigate = (value: number, route: string): void => {
  const baseURL = `/${route}`
  const urlWithQuery = `${baseURL}?id=${value}`
  window.location.href = urlWithQuery
}
