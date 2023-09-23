const generateRefral = (length)=>{
    return  Math.random().toString(36).toUpperCase().replace(/[0-9O]/g, '').substring(1,length+1)
}

module.exports = generateRefral