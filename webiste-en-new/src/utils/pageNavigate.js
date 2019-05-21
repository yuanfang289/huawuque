export default  (name,query=[],params=[]) => {
  this.$router.push({
    name: name,
    query:query,
    params: params
  })
}
