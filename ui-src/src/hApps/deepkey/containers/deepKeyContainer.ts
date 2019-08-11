import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { Key } from '../types/deepKey'
import DeepKeyOverview, { StateProps, DispatchProps } from '../components/deepKey/deepKeyOverview'
import {
	IsInitialized,
	GetRevocationRules,
	GetAuthorizor,
	GetAllKeys,
	UpdateKey,
	DeleteKey
} from '../../deepkey/actions'

// const mapStateToProps = ({ isInitialized, revocationKey, allKeys }: { isInitialized:boolean, revocationKey:string, allKeys:any }): StateProps => ({  isInitialized, revocationKey, allKeys })
const mapStateToProps = (state: any): StateProps => {
  return {
    isInitialized: state.deepKey.deepkey.isInitialized,
    revocationRuleSet: state.deepKey.deepkey.revocationRuleSet,
    authorizorKeySet: state.deepKey.deepkey.authorizorKeySet,
    allKeys: state.deepKey.deepkey.allKeys
  }
}

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  fetchIsInitialized: () => dispatch(IsInitialized.create({})),
  fetchRevocationRules: () => dispatch(GetRevocationRules.create({})),
  fetchAuthorizor: () => dispatch(GetAuthorizor.create({})),
  fetchAllKeys: () => dispatch(GetAllKeys.create({})),
  updateKey: (key: Key) => dispatch(UpdateKey.create({ old_key: key.address, signed_old_key: 'agent.hash ??', context: 'unknown' })),
  deleteKey: (key: Key) => dispatch(DeleteKey.create({ old_key: key.address, signed_old_key: 'agent.hash ??' }))
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(DeepKeyOverview)
