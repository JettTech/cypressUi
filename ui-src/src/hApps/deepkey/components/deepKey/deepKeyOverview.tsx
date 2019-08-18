import * as React from 'react'
import { Route } from 'react-router-dom'
import { withStyles, Theme, StyleRulesCallback } from '@material-ui/core/styles'
import withRoot from '../../../../withRoot'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import Person from '@material-ui/icons/Person'
import PersonAdd from '@material-ui/icons/PersonAdd'
import { List, ListItem, ListItemText } from '@material-ui/core'
import {
  IsInitialized,
  GetRevocationRules,
  GetAuthorizer,
  GetAllKeys,
  UpdateKey,
  DeleteKey,
  UpdateRevocationRules,
  SetAuthorizer // ,
  // CreateAgent
} from '../../actions'
import { KeyParams, KeyMeta, Authorizer, Rule, RevParams, AuthParams } from '../../types/deepKey' // Agent,
import DeepKeyDetail from './deepKeyDetail'

const styles: StyleRulesCallback = (theme: Theme) => ({
  root: {
    textAlign: 'left',
    paddingTop: theme.spacing.unit
  },
  paper: {
    padding: theme.spacing.unit
  },
  header: {
    textAlign: 'left',
    fontWeight: 'bolder'
  },
  initializeText: {
    textAlign: 'left',
    fontStyle: 'italic'
  }
})

export interface OwnProps {
  classes?: any,
  address?: string,
  keyType?: string
}

export interface StateProps {
  isInitialized: boolean,
  revocationRuleSet: Rule,
  authorizerKeySet?: Authorizer,
  allKeys: Array<KeyMeta>
}

export interface DispatchProps {
  fetchIsInitialized: typeof IsInitialized.sig,
  fetchRevocationRules: typeof GetRevocationRules.sig,
  fetchAuthorizer: typeof GetAuthorizer.sig,
  fetchAllKeys: typeof GetAllKeys.sig,
  updateKey: (args: KeyParams) => typeof UpdateKey.create,
  deleteKey: (args: KeyParams) => typeof DeleteKey.create,
  updateRevocationRules: (args: RevParams) => typeof UpdateRevocationRules.create,
  setAuthorizer: (args: AuthParams) => typeof SetAuthorizer.create,
  // createAgent: (args: Agent) => typeof CreateAgent
}

export type Props = OwnProps & StateProps & DispatchProps

class DeepKeyOverview extends React.Component<Props, {}> {
  makeZomeCall = (action: string, params?: any) => {
    const actionCall = this.props[action]
    actionCall(params)
      .catch((reason: any) => { console.log('HC ZOMECALL ERROR = action, result : ', action, JSON.stringify(reason)) })
  }

  componentDidMount () {
    this.makeZomeCall('fetchIsInitialized')
    this.makeZomeCall('fetchRevocationRules')
    this.makeZomeCall('fetchAuthorizer')
    this.makeZomeCall('fetchAllKeys')
    console.log('this.props', this.props)
  }

  createAuthKey () {
    console.log('about to create AuthorizationKey ')
    const authKeyParams: AuthParams = {
      authorization_key_path: 1, // TODO: Review how to DETERMINE THIS....
      signed_auth_key: 'how_do_we_determine_this????'
    }
    this.makeZomeCall('setAuthorizer', authKeyParams)
  }

  render () {
    const { classes, revocationRuleSet, authorizerKeySet, isInitialized, allKeys } = this.props
    console.log('revocationRuleSet :', revocationRuleSet)

    return (
      <div className={classes.root}>
        <Paper className={classes.paper}>
          <Typography variant='h4'>
            DeepKey
          </Typography>
          <Typography variant='body1' gutterBottom={true}>
            All DeepKey Information is stored here, so you can keep track of your device seeds/keys and know exactly which devices are secured.
          </Typography>

          <hr/>
          {isInitialized ?
            <div>
              <Typography variant='subtitle1' gutterBottom={true} className={classes.initializeText}>
                DeepKey is Initialized
              </Typography>
              {revocationRuleSet && <div>
                <Typography variant='h5' gutterBottom={true} className={classes.header}>
                  Adminstrational Keys
                </Typography>
                <DeepKeyDetail
                  address={revocationRuleSet.revocationKey}
                  keyType='revocationKey'
                  currentKey={revocationRuleSet}
                  {...this.props}
                />
                {authorizerKeySet
                  ? <DeepKeyDetail
                      address={authorizerKeySet.authorizationKey}
                      keyType='authorizationKey'
                      currentKey={authorizerKeySet}
                      {...this.props}
                  />
                  : <Route
                      render={({ history }) => (
                        <Button
                          name='addAgent'
                          color='primary'
                          onClick={() => this.createAuthKey()}
                        >
                          <PersonAdd/>
                          Create Authorization Key
                        </Button>
                      )}
                  />
                }
              </div>
              }
            </div>
          :
            <main>
              <Typography variant='subtitle1' gutterBottom={true}>
                Warning: Your DeepKey is Not Initialized.
              </Typography>
              <Typography variant='subtitle2' gutterBottom={true}>
                Please ensure your conductor is correctly configured with DeepKey and running.
              </Typography>
            </main>
          }

          <hr/>
          {allKeys && allKeys.length > 0 ?
              <div>
                <Typography variant='h5' gutterBottom={true} className={classes.header}>
                  Agent Keys
                </Typography>
                <List>
                  {
                    allKeys.map((key: KeyMeta, index: number) => (
                      // tslint:disable-next-line jsx-no-lambda
                      <Route
                        key={`${index}-deepkey`}
                        render={({ history }) => (
                          <ListItem key={`${index}-deepkey`} button={true}>
                            <ListItemIcon>
                              <Person/>
                            </ListItemIcon>
                            <ListItemText primary={key.key_type} />
                            <DeepKeyDetail
                              address={key.new_key}
                              keyType={key.key_type}
                              index={index}
                              currentKey={key}
                              {...this.props}
                            />
                          </ListItem>
                        )}
                      />
                    ))
                  }
                </List>
                <hr/>
              </div>
            :
            <div>
              <Typography variant='subtitle1' gutterBottom={true} className={classes.header}>
                No Agent Keys Currently Available
              </Typography>
            </div>
          }

          {/* TODO: NEED TO ADD PAGE AT THIS ROUTE THAT CALLS THE CONDUCTOR ADMIN CALL */}
          <Route
            render={({ history }) => (
              <Button
                name='addAgent'
                color='primary'
                onClick={() => {
                  history.push(`/deepkey/addagent`)
                }}
              >
                <PersonAdd/>
                Add Agent
              </Button>
            )}
          />
        </Paper>
      </div>
    )
  }
}

export default withRoot(withStyles(styles)(DeepKeyOverview))
