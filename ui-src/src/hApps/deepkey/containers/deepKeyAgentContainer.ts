// import { connect } from 'react-redux'
// import DeepKeyAgent, { Props, StateProps, DispatchProps, RouterProps } from '../components/deepKey/deepKeyAgent'
// import { Dispatch } from 'redux'
// import { AgentField, AgentList as AgentListType, AgentSpec } from '../types/deepkey
// import {
//   CreatePersona,
//   UpdatePersona,
//   DeletePersona,
//   AddField,
//   GetPersonas
// } from '../actions'

// const mapStateToProps = (state: any, ownProps: Props & RouterProps): StateProps => {

//   const personaName = ownProps.match.params.name
//   let persona: PersonaType

//   if (personaName === 'new') {
//     persona = {
//       name: '',
//       hash: '',
//       fields: []
//     }
//   } else {
//     persona = state.holoVault.profile.personas.filter(function (persona: PersonaType) {
//       return personaName === persona.name
//     })[0]
//   }

//   return {
//     title: `Persona - ${personaName}`,
//     currentPersona: persona,
//     personas: state.holoVault.profile.personas
//   }
// }

// const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
//   return {
//     getPersonas: () => dispatch(GetPersonas.create({})),
//     create: (personaSpec: PersonaSpec, personaFields: Array<PersonaField>) => {
//       return dispatch(CreatePersona.create({ spec: personaSpec }))
//         .then((personaAddress: string) => {
//           return Promise.all(
//             personaFields.map((field: PersonaField) => {
//               return dispatch(AddField.create({ persona_address: personaAddress, field }))
//             })
//           )
//         }
//       )
//     },
//     update: (personaAddress: string, personaSpec: PersonaSpec, personaFields: Array<PersonaField>) => {
//       return dispatch(UpdatePersona.create({ persona_address: personaAddress, spec: personaSpec }))
//         .then((updatedPersonaAddress: string) => {
//           return Promise.all(
//             personaFields.map((field: PersonaField) => {
//               return dispatch(AddField.create({ persona_address: updatedPersonaAddress, field }))
//             })
//           )
//         }
//       )
//     },
//     delete: (personaAddress: string) => {
//       return dispatch(DeletePersona.create({ persona_address: personaAddress }))
//     }
//   }
// }

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(DeepKeyAgent)
