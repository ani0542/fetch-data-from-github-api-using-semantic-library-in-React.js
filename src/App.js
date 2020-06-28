import React, { useState, useEffect} from 'react'
import './App.css'
import {Form,Card,Image,Icon} from 'semantic-ui-react';
function App()
{
    const[name,setName]=useState('');
    const[userName,setUsername]=useState('');
    const[followers,setFollowers]=useState('');
    const[following,setFollowing]=useState('');
    const[repos,setRepos]=useState('');
    const[avatar,setAvatar]=useState('');
    const[userInput,setUserInput]=useState('')
    const[error,setError]=useState(null);


    //to fetch the data

    useEffect(()=>{
        fetch('https://api.github.com/users/example')
        .then((res)=>{
            return res.json()
        })
        .then((data)=>{
            console.log(data)
            setData(data)
        })
    },[])

    //form that object which we have logged in we want
    const setData=({name,login,followers,following,public_repos,avatar_url})=>{
        setName(name)
        setUsername(login)
        setFollowers(followers)
        setFollowing(following)
        setRepos(public_repos)
        setAvatar(avatar_url)
       
    }

    const handleSearch=(e)=>{
        setUserInput(e.target.value)
    }

    const handleSubmit=()=>{
        fetch(`https://api.github.com/users/${userInput}`)
        .then((res)=>{
            return res.json()
        })
        .then((data)=>{
            setData(data)
        })
        setUserInput('')
    }
    return(<>
              <div className='navbar'>
                      Github search
              </div>
                      <div className='search'>
                              <Form onSubmit={handleSubmit}>
                                   <Form.Group>
                                          <Form.Input 

                                          placeholder='search user...'
                                          name='name'
                                         onChange={handleSearch}
                                          value={userInput}
                                          /> 

                                          
                                       <Form.Button  content='search'/>
                                    </Form.Group>  
                              </Form>
                      </div>
            
            <div className='cards'>
            <Card>
                <Image src={avatar} wrapped ui={false} />
                <Card.Content>
                  <Card.Header>{name}</Card.Header>
                  <Card.Header>{userName}</Card.Header>
                </Card.Content>
                <Card.Content extra>
                <a>
                    <Icon name='user' />
                    {followers} Followers
                </a>
                </Card.Content>

                <Card.Content extra>
                <a>
                    <Icon name='user' />
                    {repos} Repos
                </a>
                </Card.Content>

                <Card.Content extra>
                <a>
                    <Icon name='user' />
                    {following} Following
                </a>
                </Card.Content>
  </Card>
            </div>
    </>)
}
export default App;