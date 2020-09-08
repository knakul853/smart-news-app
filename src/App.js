import React, {useState, useEffect } from 'react';
import { render } from '@testing-library/react';
import wordsTonumber from 'words-to-numbers';
import { Grid, Typography, Grow } from '@material-ui/core';

import alanBtn from '@alan-ai/alan-sdk-web'
import NewsCards from './components/NewsCards/NewsCards'
import useStyle from './styles';
import logo from './images/logo.png';


const alanKey = '89695d26ab7bac84a2908021aeec1b8f2e956eca572e1d8b807a3e2338fdd0dc/stage'

const App = () => {

    const [newsArticles, setNewsArticles] = useState([]);
    const [activeArticle, setActiveArticle] = useState(-1);

    const classes = useStyle();

    useEffect(() => { 
        alanBtn({
            key: alanKey,
            onCommand: ({command, articles, number }) => {
                
                if (command === 'newsHeadline') {
                    setNewsArticles(articles);
                    setActiveArticle(-1);
                }
                else if (command === 'highlights') {
                    setActiveArticle((prevActiveArticle) => prevActiveArticle + 1);
                }
                else if (command === 'open') {
                    const parse = number.length > 2 ? wordsTonumber(number, { fuzzy: true }) : number;
                    if (parse > 20 || parse < 0) {
                        alanBtn().playText('Please Try again..');
                    }
                    else if(articles[parse-1]) {
                        
                        window.open(articles[parse - 1].url, '_blank');
                        alanBtn().playText('Openning...');
                    }
                }
            }
        })
    },
        []);

    return (
        <div>
            <div className={classes.logoContainer}>
            {newsArticles.length ? (
          <div className={classes.infoContainer}>
            <div className={classes.card}><Typography variant="h5" component="h2">Try saying: <br /><br />Open article number [4]</Typography></div>
            <div className={classes.card}><Typography variant="h5" component="h2">Try saying: <br /><br />Go back</Typography></div>
          </div>
                ) : null}
                
                <img src='https://alan.app/voice/images/previews/preview.jpg' className={classes.alanLogo} alt='alan logo' />
            </div>
            
            <NewsCards articles={newsArticles} activeArticle={activeArticle} />

            {!newsArticles.length ? (
        <div className={classes.footer}>
          <Typography variant="body1" component="h2">
            Created by
            <a className={classes.link} href="https://www.linkedin.com/in/nakul-bharti-a7b783135/"> Nakul bharti</a> -
            <a className={classes.link} href="http://github.com/knakul853/"> <i>GitHub</i></a>
          </Typography>
          <img className={classes.image}  height="50px" alt="" />
        </div>
      ) : null}
        </div>
    );
}

export default App;