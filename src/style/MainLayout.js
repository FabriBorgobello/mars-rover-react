import { Grid } from "@material-ui/core"

export const MainLayout = () => {
	return (
		<Grid container spacing={1}>
			<Grid container item xs={12}></Grid>
			<Grid container item xs={4} spacing={3}></Grid>
			<Grid container item xs={6} spacing={3}></Grid>
			<Grid container item xs={12} spacing={3}></Grid>
			<Grid container item xs={12} spacing={3}></Grid>
			<Grid container item xs={12} spacing={3}></Grid>
		</Grid>
	)
}
