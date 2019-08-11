import { createHolochainZomeCallAsyncAction } from '@holochain/hc-redux-middleware'
// import { createAction } from 'typesafe-actions'
import { Hash, Address, Rule, Authorizor } from './types/deepKey'

/*----------  DeepKey Actions  ----------*/

export const IsInitialized = createHolochainZomeCallAsyncAction<{}, boolean>(`dpki_happ`, 'dpki', 'is_initialized')

export const GetRevocationRules = createHolochainZomeCallAsyncAction<{}, {address: Hash, entry: Rule}>(`dpki_happ`, 'dpki', 'get_rules')

export const GetAuthorizor = createHolochainZomeCallAsyncAction<{}, {authorizor: Authorizor}>(`dpki_happ`, 'dpki', 'get_authorizor')

export const GetAllKeys = createHolochainZomeCallAsyncAction<{}, Address>(`dpki_happ`, 'dpki', 'get_all_keys')

export const UpdateKey = createHolochainZomeCallAsyncAction<{old_key: string, signed_old_key: string, context: 'unknown'}, Address>(`dpki_happ`, 'dpki', 'update_key')

export const DeleteKey = createHolochainZomeCallAsyncAction<{old_key: string, signed_old_key: string}, Address>(`dpki_happ`, 'dpki', 'delete_key')
