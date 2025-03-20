

export let messageFormatter = (message, i) => {
  if(!message) return ""
    if(i % 2 === 0){
      return {
        role: "ai",
        text: message
      }
    }
    return {
      role: "user",
      text: message
    }
}