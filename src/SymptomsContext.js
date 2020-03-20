import React from 'react'

const SymptomsContext = React.createContext({
    newinfectionindicators: [],
    generalhealth: [],
    symptoms: [],
    symptomlog: [],
    addLog: () => {},
    deleteLog: () => {}

})

export default SymptomsContext;