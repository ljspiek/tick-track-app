import React from 'react'

const SymptomsContext = React.createContext({
    newinfectionindicators: [],
    generalhealth: [],
    symptoms: [],
    symptomlog: [],
    currentlog: {},
    loggedIn: false,
    addLog: () => {},
    deleteLog: () => {},
    updateLogin: () => {}

})

export default SymptomsContext;