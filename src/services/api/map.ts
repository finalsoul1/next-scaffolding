export default (key: string) => {
  const map: {[index: string]: object} = {
    'getProduct': {
      'url': 'https://gateway-stage.seoulstore.com/siteProducts/:id',
      'method': 'GET',
    },
  }
  return map[key]
}
