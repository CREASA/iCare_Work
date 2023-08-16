import React from 'react'; //Import React components
import Card from '@mui/material/Card'; //Import Material UI components
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

//Creating a reusable card to be used inside the About Component
const card = (
    <React.Fragment>
      <CardContent>
        <Typography variant="body2">
          {/* new content can go here */}
        </Typography>
      </CardContent>
    </React.Fragment>
  );

export function About() {
    return (
        <div style={{textAlign:'left'}}>
            <br></br>
            <br></br>
            <Card variant="outlined" style={{'backgroundColor':'#D9D9D9','width':'60vh','height':'75vh','margin':'2rem'}}>
                {card}
            </Card>
        </div>
        
    )
}