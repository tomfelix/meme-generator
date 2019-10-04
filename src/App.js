/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Meme from './components/Meme';
import './App.css';

const changeObjectToParams = (obj) => {
  const params = Object.entries(obj).map(([key, value]) => {
    return `${key}=${value}`;
  });
  return '?' + params.join('&');
}

export default function App() {
  const [templates, setTemplates] = useState([]);
  const [chosenTemplate, setChosenTemplate] = useState(null);
  const [topText, setTopText] = useState('');
  const [bottomText, setBottomText] = useState('');
  const [meme, setMeme] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const memes = await axios('https://api.imgflip.com/get_memes');
      setTemplates(memes.data.data.memes);
    };
    fetchData();
  }, []);

  return (
    <div className="container">
      <div className="templates_array">
        {templates.map(template => {
          return (
            <div className="template">
              <Meme
                data={template}
                handleImageClick={() => {
                  setMeme(null);
                  setChosenTemplate(template);
                }
                }
              />
            </div>
          )
        })
        }
      </div>
      {
        meme !== null ?
          <div className="template_chosen">
            <img src={meme} alt={meme} />
            <button onClick={() => setMeme(null)}>create new one</button>
          </div>
          :
          <div className="template_chosen">
            {(chosenTemplate !== null)
              ?
              <>
                <Meme
                  data={chosenTemplate}
                />
                <form
                  onSubmit={
                    async (e) => {
                      e.preventDefault();
                      const params = {
                        template_id: chosenTemplate.id,
                        username: 'tom_felix',
                        password: '1Ramboimgflip1',
                        text0: topText,
                        text1: bottomText,
                        // boxes: [
                        //   {
                        //     "text": topText,
                        //     "x": 10,
                        //     "y": 10,
                        //     "width": 548,
                        //     "height": 100,
                        //     "color": "#ffffff",
                        //     "outline_color": "#000000"
                        //   },
                        //   {
                        //     "text": bottomText,
                        //     "x": 10,
                        //     "y": 225,
                        //     "width": 548,
                        //     "height": 100,
                        //     "color": "#ffffff",
                        //     "outline_color": "#000000"
                        //   },
                        //   {
                        //     "text": "Make custom memes on the web via imgflip API",
                        //     "x": 10,
                        //     "y": 440,
                        //     "width": 548,
                        //     "height": 100,
                        //     "color": "#ffffff",
                        //     "outline_color": "#000000"
                        //   }
                        // ]
                      };
                      const response = await axios.post(`https://api.imgflip.com/caption_image${changeObjectToParams(params)}`);
                      setMeme(response.data.data.url);
                    }
                  } >

                  <input type="text" placeholder="top text" value={topText} onChange={(e) => setTopText(e.target.value)} />
                  <input type="text" placeholder="bottom text" value={bottomText} onChange={(e) => setBottomText(e.target.value)} />
                  <button>Create</button>
                </form>
              </>
              :
              ''
            }
          </div>
      }
    </div>
  )
}
