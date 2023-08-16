import React, { useState } from 'react'; //import React Component
import { FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';


// bot selection
function BotSelect(props) {
  const [bot, setBot] = useState("CareBot");

  function formSubmit(event) {
    event.preventDefault();
    console.log(bot);
  }

  function handleChange(event) {
    let newBot = event.target.value;
    setBot(newBot);
  }

  // button navigate
  let navigate = useNavigate();
  const routeChange = () => {
    navigate("../" + bot);
  }
  //bot selection form returned
  return (
    <div>
      <form id='botSelectionForm' onSubmit={formSubmit}>
        <FormControl >
        <br></br>
        <br></br>
          <FormLabel id="botSelection">Who would you like to Chat with?</FormLabel>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="HomeCare"
            name="radio-buttons-group"
          >
            <FormControlLabel id="CareBot" value="carebot" control={<Radio />} label="Care Bot" onChange={handleChange} />
            <FormControlLabel id="CoachBot" value="coachbot" control={<Radio />} label="Coach Bot" onChange={handleChange} />
          </RadioGroup>
          <Button
            variant='contained'
            color='primary'
            size='small'
            onClick={routeChange}
          >
            Continue
          </Button>

        </FormControl>
        {/* <input type="submit" value="Submit" /> */}


      </form>


    </div>
  );
}

export default BotSelect;
