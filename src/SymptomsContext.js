import React from 'react'

const SymptomsContext = React.createContext({
    newinfectionindicators: [],
    generalhealth: [],
    symptoms: [],
    symptomlog: [],
    currentlog: {},
    addLog: () => {},
    deleteLog: () => {}

})

export default SymptomsContext;