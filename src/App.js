import React from 'react';
import './App.css';
import {Icon, Menu} from 'antd';
import {Link, Route, Switch} from "react-router-dom";
import Home from "./components/home/Index"
import Specialties from "./components/specialties/Index"
import {AddOwner, EditOwner, Owner, Owners} from "./components/owners"
import {Veterinarians} from "./components/veterinarians"
import {AddPet, EditPet} from "./components/pets";
import {AddVisit} from "./components/visits";

class App extends React.Component {

  keys = ["home", "owners", "veterinarians", "specialties"];

  state = {
    current: 'home',
  };

  handleClick = (e) => {
    console.log('click ', e);
    this.setState({
      current: e.key,
    });
  };

  componentDidMount() {
    this.keys.forEach(key => {
      if (this.props.location.pathname.includes(key)) {
        this.setState({
          current: key
        });
      }
    });
  }

  render() {
    return (
        <div>
          <Menu onClick={this.handleClick} selectedKeys={[this.state.current]} mode="horizontal">
            <Menu.Item key="home">
              <Link to={"/"}><Icon type="mail"/>Home</Link>
            </Menu.Item>
            <Menu.Item key="owners">
              <Link to={"/owners"}><Icon type="appstore"/>Owners</Link>
            </Menu.Item>
            <Menu.Item key="veterinarians">
              <Link to={"/veterinarians"}><Icon type="mail"/>Veterinarians</Link>
            </Menu.Item>
            <Menu.Item key="specialties">
              <Link to={"/specialties"}><Icon type="appstore"/>Specialties</Link>
            </Menu.Item>
          </Menu>
          <div style={{marginTop: 20}}>
            <Switch>
              <Route path={"/owners/add"} component={AddOwner}/>
              <Route path={"/owners/:id/edit"} component={EditOwner}/>
              <Route path={"/owners/:id/pets/new"} component={AddPet}/>
              <Route path={"/owners/:id/pets/:petid/edit"} component={EditPet}/>
              <Route path={"/owners/:id/pets/:petId/visits/new"} component={AddVisit}/>
              <Route path={"/owners/:id"} component={Owner}/>
              <Route path={"/owners"} component={Owners}/>
              <Route path={"/veterinarians"} component={Veterinarians}/>
              <Route path={"/specialties"} component={Specialties}/>
              <Route path={"/"} component={Home}/>
            </Switch>
          </div>
        </div>
    );
  }
}

export default App;
