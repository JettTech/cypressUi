import * as React from 'react'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardActions from '@material-ui/core/CardActions'
import { DeleteForever, Autorenew } from '@material-ui/icons'
import { withStyles, Theme, StyleRulesCallback } from '@material-ui/core/styles'
import withRoot from '../../../../withRoot'

const styles: StyleRulesCallback = (theme: Theme) => ({
  card: {
    maxWidth: 300
  },
  media: {
    height: 0,
    paddingTop: '56.25%' // 16:9
  },
  actions: {
    display: 'flex'
  },
  title: {
    fontSize: 8,
    marginTop: 10
  }
})

function DeepKeyDetail ({ classes, address, keyType }: { classes: any, address: string; keyType: string }) {
  return (
		<Card className={classes.card}>
			<CardHeader
				subheader={`Key: ${address}`}
			/>
			<hr style={{ margin: '5px auto', width: '95%' }}/>
			<CardActions className={classes.actions} disableActionSpacing={true}>
				<Button size='small' color='primary' onClick={() => console.log('PLUG IN the fn to RECYCLE keys.  Key to recycle : ', address)}>
					<Autorenew/>
					Recycle
				</Button>
				<Button size='small' color='primary' onClick={() => console.log('PLUG IN the fn to DELETE keys.  Key to delete : ', address)}>
					<DeleteForever/>
					Delete
				</Button>
			</CardActions>
		</Card>
  )
}

export default withRoot(withStyles(styles)(DeepKeyDetail))
