import React, { useState } from 'react'; //import React Component
import { FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Button } from '@mui/material';


// bot selection
function Login2(props) {
  const [bot, setBot] = useState(null);

  function formSubmit(event) {
    event.preventDefault();
    console.log(bot);
  }

  function handleChange(event) {
    let newBot = event.target.value;
    setBot(newBot);
  }
  // login2 page: bot selection form returned
  return(
    <div>
      <form id='botSelectionForm' onSubmit={formSubmit}>
        <FormControl>
          <FormLabel id="bot-selection-label">Who would you like to Chat with?</FormLabel>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="HomeCare"
            name="radio-buttons-group"
          >
            <FormControlLabel id="HomeCare" value="HomeCare" control={<Radio />} label="Home" onChange={handleChange}/>
            <FormControlLabel id="iCareBot" value="iCareBot" control={<Radio />} label="iCare" onChange={handleChange}/>
          </RadioGroup>
          <Button
            variant='contained'
            color='primary'
            size='small'
            >
            Continue
            </Button>
        </FormControl>


      </form>


    </div>
  );
}

export default Login2;
