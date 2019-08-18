import { createHolochainZomeCallAsyncAction } from '@holochain/hc-redux-middleware'
// import { connect } from '@holochain/hc-web-client'
// import { get } from 'lodash/fp'
import { Hash, Address, Signature, Rule, Authorizer, KeyMeta } from './types/deepKey'

/*----------  DeepKey Actions  ----------*/

export const IsInitialized = createHolochainZomeCallAsyncAction<{}, boolean>(`dpki_happ`, 'dpki', 'is_initialized')

export const GetRevocationRules = createHolochainZomeCallAsyncAction<{}, Array<{address: Address, entry: Rule}>>(`dpki_happ`, 'dpki', 'get_rules')

export const UpdateRevocationRules = createHolochainZomeCallAsyncAction<{revocation_key: Hash, signed_old_revocation_key: Signature}, Address>(`dpki_happ`, 'dpki', 'update_rules')

export const SetAuthorizer = createHolochainZomeCallAsyncAction<{authorization_key_path: number, signed_auth_key: Signature}, Address>(`dpki_happ`, 'dpki', 'set_authorizor')

export const GetAuthorizer = createHolochainZomeCallAsyncAction<{}, Authorizer>(`dpki_happ`, 'dpki', 'get_authorizor')

export const GetAllKeys = createHolochainZomeCallAsyncAction<{}, Array<KeyMeta>>(`dpki_happ`, 'dpki', 'get_all_keys')

export const UpdateKey = createHolochainZomeCallAsyncAction<{old_key: Hash, signed_old_key: Signature, context?: String}, Address>(`dpki_happ`, 'dpki', 'update_key')

export const DeleteKey = createHolochainZomeCallAsyncAction<{old_key: Hash, signed_old_key: Signature}, Address>(`dpki_happ`, 'dpki', 'delete_key')

/*----------  Conductor ADMIN Actions  ----------*/

export const CreateAgent = createHolochainZomeCallAsyncAction<{}, Address>('admin', 'agent', 'add')

export const GetAgentList = createHolochainZomeCallAsyncAction<{}, Array<any>>('admin', 'agent', 'list')

// const createAsyncConductorAdminAction = (adminCommand:string, args:any) => {
//   return new Promise((resolve, reject) => {
//     let result:any
//     connect().then(async({call, close}) => {
//       result = await call(`admin/agent/${adminCommand}`)(args)
//       const error = get('Err', JSON.parse(result)) || get('SerializationError ', JSON.parse(result))

//       console.log("!! MADE ADMIN CONDUCTOR CALL. Here is the parsed result : ", JSON.parse(result))

//       if (error) throw (error)
//       else return JSON.parse(result)
//     })
//     resolve(result)
//   })
// }

// CREATE NEW AGENT >> ADMIN CONDUCTOR call >>> admin/agent/add
// export const CreateAgent = (args:any) => createAsyncConductorAdminAction('add', args)

// // LIST ALL AGENTS>> ADMIN CONDUCOR call >>> admin/agent/list`
// export const ListAgent = () => createAsyncConductorAdminAction('list', {})
