const apiMap = (key: string) => {
  const map: { [index: string]: { url: string; method: string } } = {
    getProduct: {
      url: '',
      method: 'GET',
    },
    getCategories: {
      url: '',
      method: 'GET',
    },
  }
  return map[key]
}

export default apiMap
