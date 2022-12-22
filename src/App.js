import React, { useEffect, useState } from 'react'
import Ficha from './components/Ficha';

function App() {
    const [users, setUsers] = useState(null);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [gender, setGender] = useState('female');


    useEffect(() => {
        getUsers();
    }, [])

    const getUsers = () => {
        fetch('https://3001-ljavierrodr-introtofetc-7wmzfscs43y.ws-us80.gitpod.io/users')
            .then((response) => response.json())
            .then((data) => setUsers(data));
    }

    const registerUser = (info) => {
        console.log(info);

        let options = {
            method: 'POST',
            body: JSON.stringify(info),
            headers: {
                'Content-Type': 'application/json'
            }
        }

        fetch('https://3001-ljavierrodr-introtofetc-7wmzfscs43y.ws-us80.gitpod.io/users', options)
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
                if (data.id) {
                    //setUsers([...users, data])

                    setUsers((prevUsers) => {
                        return [...prevUsers, data]
                    })

                    setName('');
                    setEmail('');
                    setGender('female');

                    // o ejecutamos la funcion que busca los usuarios

                    //getUsers()
                }


            });

    }

    const deleteUser = id => {
        let options = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        }
        fetch(`https://3001-ljavierrodr-introtofetc-7wmzfscs43y.ws-us80.gitpod.io/users/${id}`, options)
            .then((response) => {
                console.log(response)
                if(response.ok){
                    getUsers();
                }
                return response.json()
            })
            .then((data) => {
                console.log(data)
            })
    }

    const register = e => {
        e.preventDefault();

        //console.log(name, email, gender);

        registerUser({ name: name, email: email, avatar: `https://avatars.dicebear.com/api/${gender}/${name}.svg?background=%230000ff` })

    }

    return (
        <>
            <div>App</div>
            <div className="d-flex flex-column align-items-center mb-5">
                {
                    !!users &&
                        users.length > 0 ?
                        users.map(({ id, name, email, avatar }) => <Ficha key={id} id={id} name={name} email={email} avatar={avatar} deleteUser={deleteUser} />) : (
                            <div className="card">
                                <div className="card-body">
                                    <p>No hay usuarios</p>
                                </div>
                            </div>
                        )
                }
            </div>

            <div className="d-flex">
                <form className="w-50 mx-auto" onSubmit={register}>
                    <input type="text" className="form-control mb-2" id="name" placeholder='Insert name' value={name} onChange={(e) => setName(e.target.value)} />
                    <input type="email" className="form-control mb-2" id="email" placeholder='Insert email' value={email} onChange={(e) => setEmail(e.target.value)} />
                    <div className="form-check">
                        <input className="form-check-input" type="radio" name="gender" id="gender_male" value={"male"} onClick={(e) => setGender(e.target.value)} checked={gender === 'male' ? true : false} />
                        <label className="form-check-label" for="gender_male">
                            Male
                        </label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="radio" name="gender" id="gender_female" value={"female"} onClick={(e) => setGender(e.target.value)} checked={gender === 'female' ? true : false} />
                        <label className="form-check-label" for="gender_female">
                            Female
                        </label>
                    </div>
                    <button className="btn btn-primary">Registrar</button>
                </form>
            </div>
        </>
    )
}

export default App