var eventsType = [
    {
        name: 'click'
    },
    {
        name: 'change'
    },
    {
        name: 'blur'
    },
    {
        name: 'focus'
    }
]

module.exports = `var eventsType = ${ JSON.stringify(eventsType) }`
