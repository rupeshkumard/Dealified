import React from 'react';
import { Page, Panel, Table, TableHead, TableBody, TableRow, Button, EditableText, Pagination, Breadcrumbs } from 'react-blur-admin';
import { Link } from 'react-router';
import jQuery from 'jquery';
import {Row, Col} from 'react-flex-proto';
require('../layout/css/table.css');

var Griddle = require('griddle-react');


class LinkComponent extends React.Component{

  render(){
    const size = {
      height: '42px',
      width: '42px'
    }
    const style = {
      color: '#FFFFFF'
    }
    if(this)
      return(
        <img src={this.props.data} width={size.width} height={size.height}> </img>
      );
  }

}

class HyperComponent extends React.Component{

  render(){
    const size = {
      height: '42px',
      width: '42px'
    }

    const style = {
      color: '#FFFFFF'
    }

    if(this)
      return(
        <div><img className="tableName" href={this.props.rowData.href}>{this.props.data}</img></div>
      );


  }

}


export class TableDemo extends React.Component {

  constructor() {
    super();
    this.state = {
      list:[]
    };
  }
  componentWillMount(){
    this._loadItems();
  }

  componentDidMount(){
    setInterval(this._loadItems(), 5000);
  }

  onEditableChange(key, value) {
    this.setState({[key]: value});
  }

  componentDidMount(){
    // setInterval(this._loadItems(), 5000);
  }


  renderBreadcrumbs() {
    return (
      <Breadcrumbs>
        <Link to='/'>
          Home
        </Link>
          Hot Deals
      </Breadcrumbs>
    );
  }

  _loadItems(){
    jQuery.ajax({
      method: 'GET',
      url: '/api/getData',
      success: (listItem) => {
        this.setState({list: listItem });
      }
    });
  }

  _getItems(){
    const size = {
      height: '42px',
      width: '42px'
    }

    const style = {
      color: '#FFFFFF'
    }

    return(
      this.state.currentList.map(item => {
        return( <TableRow key={item._id}>
            <td><img src={item.image} height={size.height} width={size.width} /></td>
            <td><a href={item.href} style={style}>{item.title}</a></td>
            <td>{item.postDate} {item.postTime}</td>
            <td><Button type='success' title='Active' size='sm'/></td>
          </TableRow>
        );
      })
    );
  }
  render() {
    const metaData = [{
      "columnName": "title",
      "order": 7,
      "locked": false,
      "visible": true,
      "displayName": "Title",
      "customComponent": HyperComponent
    },
      {
        "columnName": "postDate",
        "order": 8,
        "locked": false,
        "visible": true,
        "displayName": "Date"
      },
      {
        "columnName": "postTime",
        "order": 7,
        "locked": false,
        "visible": true,
        "displayName": "Time"
      },
      {
        "columnName": "image",
        "order": 6,
        "locked": false,
        "visible": true,
        "displayName": "Image",
        "customComponent": LinkComponent
      },
      {
        "columnName": "href",
        "order": 0,
        "locked": false,
        "visible": false
      },
      {
        "columnName": "_id",
        "order": 1,
        "locked": false,
        "visible": false
      }
    ];

    return (
      <Page actionBar={this.renderBreadcrumbs()} title='Hot Deals'>
        <Panel>
          <Griddle results={this.state.list} useGriddleStyles={false} columnMetadata={metaData} tableClassName="table" showFilter={true}
                   showSettings={true} nextIconComponent={<button className="btn btn-info btn-xm">Next</button>} columns={["image", "postDate", "title"]}/>
        </Panel>
      </Page>
    );
  }
}

