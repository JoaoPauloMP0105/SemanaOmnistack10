import React, { useState, useEffect } from 'react';
import './styles.css';

function DevForm({ onSubmit }) {

    const [github_username, setGithubusername] = useState('');
    const [techs, setTechs] = useState('');


    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');


    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
    
            setLatitude(latitude);
            setLongitude(longitude);
          },
          (err) => {
            console.log(err);
          },
          {
            timeout: 30000,
          }
        )
      }, []);

     async function handleSubmit(e) {
           e.preventDefault(); 
         await onSubmit({
            github_username,
            techs,
            latitude,
            longitude,
         });
         setGithubusername('');
         setTechs('');
         
      }

    return (
        <form onSubmit={handleSubmit}>
            <div className="input-block">
              <label htmlfor="github_username">Usuario do Github</label>
              <input 
                name="github_username" 
                id="username_github" 
                require 
                value = { github_username}
                onChange ={e => setGithubusername(e.target.value)}
              />
            </div>
            <div className="input-block">
                <label htmlfor="techs">Tecnologias</label>
                <input 
                  name="techs" 
                  id="techs" 
                  require 
                  value = {techs}
                  onChange={e => setTechs(e.target.value)}
                />
            </div> 

            <div className="input-group">
              <div className="input-block">
                  <label htmlfor="latitude">latitude</label>
                  <input 
                    type="number" 
                    name="latitude" 
                    id="latitude" 
                    require 
                    value={latitude}
                    onChange={e => setLatitude(e.target.value)} 
                  />
              </div> 

              <div className="input-block">
                <label htmlfor="longitude">longitude</label>
                <input 
                  type="number" 
                  name="longitude" 
                  id="longitude" 
                  require 
                  value={longitude}
                  onChange={e => setLongitude(e.target.value)}
                />
              </div>                
            </div>

            <button type="submit">Salvar</button>
         </form>
    );

}

export default DevForm;