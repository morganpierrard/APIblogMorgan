import React, {Component} from 'react'
import axios from 'axios'

class AdminLogin extends Component{
  constructor(props) {
        super(props)
        this.state ={
            login : [],
            email:"",
            password:""
        }
    }

    sendProps = () => {
           this.props.callback(this.state)
       }

    handleOnChange = (e) => {
           this.setState({
               [e.target.name] : e.target.value
           })
           console.log(this.props.test)
       }

    submit = (e)=>{
      e.preventDefault();
      const login= {
        email:this.state.email,
        password:this.state.password
      }
          axios.post('http://localhost:5678/api/admin/login', login)
          .then(response=>{
            this.setState({
              login:response
            })
            this.props.history.push("/admin")
          })
          .catch(err =>{throw err})
    }

    render(){
      return (
        <div className="container">
         <div className="mt-5">
           <form className="form-group" onSubmit={this.submit}>
             <input onChange={this.handleOnChange} className="form-control mb-3" type="text" name="email" placeholder="Entrer un email"/>
             <input onChange={this.handleOnChange} className="form-control mb-3" type="password" name="password" placeholder="Entrer un mot de passe"/>
             <div className="row text-center">
               <div className="col-12">
                 <button className="btn btn-warning align-center" type="submit">Connexion</button>
               </div>
            </div>
           </form>
         </div>
       </div>
        )
    }
}

export default AdminLogin
