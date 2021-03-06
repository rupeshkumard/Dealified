import React from 'react';
import { Page, Panel, Modal, Input } from 'react-blur-admin';
import { Row, Col } from 'react-flex-proto';
import {SearchBar} from 'src/layout/components/search-bar';
import Card from 'src/layout/components/card';
import {AlertModal} from '../layout/components/modal';
import CoverFlow from 'src/layout/components/coverflow';
import {Button} from 'react-blur-admin';
require('../layout/css/welcome.css');
import eventBus from 'src/lib/event-bus';
import $ from 'jquery';
var pubsub = require('pubsub-js');




export class Welcome extends React.Component {

  constructor(){
    super();
    this.state = {
      list:[],
      alert:false,
      useremail:'',
      username:''
    };
  }

  componentWillMount(){

    this.lock = new Auth0Lock(process.env.AUTH0_PUB_KEY, process.env.AUTH0_DOMAIN);
   const idToken = localStorage.getItem('userToken');
    this.lock.getProfile(idToken, function (err, profile) {
      if (err) {
        console.log("Error loading the Profile", err);
        return;
      }
      console.log(profile.name);
      console.log(profile.email);
      this.setState({useremail: profile.email});
      this.setState({username: profile.name});

      console.log(this.state);
      // localStorage.setItem('userEmail', profile);
    }.bind(this));
  }


  componentDidMount(){
    pubsub.subscribe('searchChange', (message, data) => {
      console.log("Data is: "+data);
      this.setState({list : data});
    });
    pubsub.subscribe('alertClosed', (message, data) => {
      console.log("Data is: "+data);
      this.setState({alert: !this.state.alert});
    });
    pubsub.subscribe('modalFinished', (message, data) => {
      // alert(false);
      this.setState({alert: false});
    });
    $(document).on("mouseover", "#product-card", function(e){
      $(e.currentTarget).addClass('animate');
    });

    $(document).on("mouseout", "#product-card", function(e){
      $(e.currentTarget).removeClass('animate');
    });
  }

  modal(){
    eventBus.emit('alertRequested');
    this.setState({alert: !this.state.alert});

    console.log(this.state.alert);
  }

  renderModal(){
    if(this.state.alert)
      return
  }


  renderSearch() {
    return (
      <div className="search">
        <SearchBar />
      </div>
    );
  }


  renderCard() {
    return (
      this.state.list.map((item) => {
        return (
          <Col padding={5}>
            <Panel className="panel1">
              <Card data={item}/>
            </Panel>
          </Col>
        );
      })
    );

  }

  render() {
    return (
      <Page title="Dashboard">
        <Row>
          <Col padding={5}>
            <Panel>
              {this.renderSearch()}
            </Panel>
          </Col>
          <AlertModal   open={this.state.alert} email={this.state.useremail} name={this.state.username}/>
          <Col padding={11} grow={false}>
            <Button type='info' title='Create Alert!' icon='fa fa-wrench' onClick={this.modal.bind(this)} />
          </Col>
        </Row>
        {this.state.list.length > 0 ? <h2>Search Results</h2> : null}
        <Row>
          {this.renderCard()}
        </Row>
        {/*<div className="content1"></div>*/}
        <CoverFlow/>
      </Page>
    );
  }
}

