import React, { Component, useEffect, useState } from 'react';

// Date a Material UI
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider,KeyboardDatePicker } from '@material-ui/pickers';
import { Button, Grid, makeStyles, Typography } from '@material-ui/core';


// Props
interface Props {
	filterByDates: (beginDate: Date, endDate: Date) => void
	getBackDates: string[]
}


// Styles
// h3 + datumy niesu najlepsie vycentrovane do stredu
const useStyles = makeStyles((theme) => ({
  h3: {
    ...theme.typography.button,
    backgroundColor: "#e8dccc",
    padding: 8,
    paddingTop: 10,
		maxWidth: "100%",
		fontSize: 18,
		textAlign: "center",
		borderRadius: "5px",
    margin: '5%',
  },
	grid: {
		marginTop: 20,
		marginBottom: 20,
    textAlign: 'center',
	}, 
	datePicker: {
		width: "75%"
	},
  btn: {
    ...theme.typography.button,
    backgroundColor: "#e8dccc",
    padding: 22,
    paddingBottom: 10,
    paddingTop: 12,
		maxWidth: "100%",
		fontSize: 20,
		textAlign: "center",
		borderRadius: "5px",
    margin: '1%',
    marginBottom: '3%'
  },
}));



const DateSlider = (props: Props) => {
	// Constants
  const date = new Date()
  date.setMonth(date.getMonth() - 3);
  const [begginingDate, setBegginingDate] = useState<Date>(date)
	const [endingDate, setEndingDate] = useState<Date | null>(new Date)
	const classes = useStyles();
  const setDates = props.filterByDates
  const getBackDates = props.getBackDates
  // nedokoncene => Sluzi na to ked sa spravi rerender ordersPage tak
  // datumy ostanu take ake boli najprv zadane (imidzovka)
  // const datesAfterRerenderPage = props.datesAfterRerenderPage


  //Na zapametanie datumu po vrateni sa na orders page
  useEffect(() => {
    if(getBackDates !== undefined){
      const beginDate = new Date(getBackDates[0])
      const endDate = new Date(getBackDates[1])
      setBegginingDate(beginDate)
      setEndingDate(endDate)
    }
  }, [getBackDates])


	// Odchytenie zaciatku datumu
	const handleBegginingDate = (date: Date | null) => {
		setBegginingDate(date);
	};


	// Odchytenie koncovehao datumu
	const handleEndingDate = (date: Date | null) => {
		setEndingDate(date);
	}


  // Poslanie datumu po kliknuti na tlacitko
  const onSubmitDate = () => {
    if(begginingDate && endingDate) {
			setDates(begginingDate, endingDate)
		}
  }


	// Render
  return (
    <div>
		<Grid 
			container 
			justify = "center" 
			alignItems = "center"
		>
			<Grid item className={classes.grid} >
				<MuiPickersUtilsProvider utils={DateFnsUtils}>
					<Typography variant="h3" className={classes.h3}>
						Pociatocny datum
					</Typography>
					<KeyboardDatePicker
						className = {classes.datePicker}
						disableToolbar
						variant="inline"
						format="dd/MM/yyyy"
						margin="normal"
						id="date-picker"
						value={begginingDate}
						onChange={handleBegginingDate}
						disableFuture = {true}
					/>
				</MuiPickersUtilsProvider>
			</Grid>
			<Grid item className={classes.grid} >
				<MuiPickersUtilsProvider utils={DateFnsUtils}>
					<Typography variant="h3" className={classes.h3}>
						Koncovy datum
					</Typography>
					<KeyboardDatePicker
						className = {classes.datePicker}
						disableToolbar
						variant="inline"
						format="dd/MM/yyyy"
						margin="normal"
						id="date-picker"
						value={endingDate}
						onChange={handleEndingDate}
						disableFuture = {true}
					/>
				</MuiPickersUtilsProvider>
			</Grid>
		</Grid>
    <Grid 
      container 
      justify = "center" 
      alignItems = "center"
    >
      <Button
        className={classes.btn}
        onClick={onSubmitDate}
        >Potvrdiť
      </Button>
    </Grid>
    </div>
  );
}

export default DateSlider