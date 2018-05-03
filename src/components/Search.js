import React, { Component } from "react";
import axios from "axios";
import { getUser } from "../ducks/reducer";
import { connect } from "react-redux";
import Nav from "./Nav";
import "../App.css";

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      view: "Search",
      users: [],
      users2ElectricBoogaloo: [],
      filter: "",
      filterProp: "first_name",
      filterSwitch: false,
      offSetVal: 0,
      dbCount: 0,
      pageTotal: 0,
      pageArray: [],
      pageDisplayed: 1,
      limit: 20
    };
    this.addFriend = this.addFriend.bind(this);
    this.removeFriend = this.removeFriend.bind(this);
    this.getComponent = this.getComponent.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeISay = this.handleChangeISay.bind(this);
    this.search = this.search.bind(this);
    this.reset = this.reset.bind(this);
    this.changePage = this.changePage.bind(this);
  }
  getComponent() {
    axios.get("/api/user/count").then(res => {
      console.log("dbcount: ", res.data[0].count);
      this.setState({ dbCount: res.data[0].count }, () =>
        this.setState({ pageTotal: Math.ceil(this.state.dbCount / 20) }, () => {
          var pageArraySet = [];                                                        // fetch count of users in db, divide by 20 to get total pages
          var newOffSet = 0;                                                            // add 20 to user count for offset val to start next page render of users, 
          var currentpage = 1;                                                          // and add 1 to current page val to get the value of the next page 

          for (let i = 0; i < this.state.pageTotal; i++) {
            console.log("pagearrayset: ", this.state.pageTotal);
            pageArraySet.push({ offset: newOffSet, pagenumber: currentpage });
            newOffSet += 20;
            currentpage += 1;
          }
          this.setState({ pageArray: pageArraySet });
        })
      );
    });

    axios
      .get(
        `/api/user/list?value=${this.state.offSetVal}&limit=${this.state.limit}`
      )
      .then(res =>
        this.setState({ users2ElectricBoogaloo: res.data }, () =>
          axios.get("/api/friend/list").then(res => {               // fetch all users, store them in users2, 
            var newData = res.data;                                 // fetch all friends, store them in newData,
            var newDD = [];                                         // push all friends into empty array newDD,

            for (let i = 0; i < newData.length; i++) {
              newDD.push(newData[i].friend_id);
            }

            var newData2 = this.state.users2ElectricBoogaloo;       // iterate thru all users,
            for (let j = 0; j < newData2.length; j++) {             // and iterate thru all friends,
              for (let k = 0; k < newDD.length; k++) {              // if id of user = friend, store that to use in add/remove friend button ternary later
                if (newData2[j].id === newDD[k]) {
                  newData2[j].identify = 1;
                  console.log('user from search: ',newData2[j]);
                  console.log('id of friend from search: ', newDD[k]);
                }
              }
            }
            this.setState({ users: newData2 });
          })
        )
      );
  }
  componentWillMount() {
    const { history } = this.props;
    this.props.getUser(history);
    this.getComponent();
  }

  addFriend(val) {
    axios.post("/api/friend/add", { val }).then(res => {
      this.getComponent();
    });
  }

  removeFriend(val) {
    axios.post("/api/friend/remove", { val }).then(res => {
      this.getComponent();
    });
  }

  handleChange(val) {
    this.setState({ filter: val });
  }

  handleChangeISay(e) {
    this.setState({ filterProp: e.target.value });
  }

  search() {
    this.setState({ limit: this.state.dbCount, offSetVal: 0 }, () =>
      this.getComponent()
    );
    this.setState({ filterSwitch: true });
  }

  reset() {
    this.setState({ limit: 20, offSetVal: 0, filter: "" }, () =>
      this.getComponent()
    );
    this.setState({ filterSwitch: false });
  }

  changePage(page) {
    this.setState(
      { offSetVal: page.offset, pageDisplayed: page.pagenumber },
      () => this.getComponent()
    );
  }

  render() {
    if (!this.state.filterSwitch) {
      var pages = this.state.pageArray.map((page, i) => {
        return (
          <div key={i} className="pageBox">
            {page.pagenumber === this.state.pageDisplayed ? (
              <div>
                {
                  <button className="currentPage">
                    page {page.pagenumber}
                  </button>
                }
              </div>
            ) : (
              <button
                className="otherPage"
                onClick={() => this.changePage(page)}
              >
                {page.pagenumber}                                               
              </button>                                                     // filter funcionality: filterswitch initially false,
            )}                                                              
          </div>                                                            // while false, maintain pagination of user results
        );                                                                  // when true, filter thru users on state and save/map results
      });                                                                   // into new friendBox variable (div) along with add/remove friend button
    }                                                                       //  that changes based on previous double looping
    var filterRec = [];
    if (this.state.filterSwitch) {
        filterRec = this.state.users.filter(                                  
        people => people[this.state.filterProp] === this.state.filter
      );
    } else {
      filterRec = this.state.users;
    }

    var friendBoxes = filterRec.map((people, i) => {
      return (
        <div key={i} className="friendBox">
          <img width="100px" src={people.img} alt="not found" />

          <div className="friendBox_name">
            <span>{people.first_name} </span>
            <span>{people.last_name}</span>
          </div>

          {people.identify ? (
            <div>
              {
                <button
                  id="blackButton"
                  className="friendBox_button"
                  onClick={() => this.removeFriend(people.id)}
                >
                  Remove Friend
                </button>
              }
            </div>
          ) : (
            <div>
              {
                <button
                  className="friendBox_button"
                  onClick={() => this.addFriend(people.id)}
                >
                  Add Friend
                </button>
              }
            </div>
          )}
        </div>
      );
    });

    return (
      <div>
        <Nav>{this.state.view}</Nav>
        <div className="pagebody">
          <div className="searchMiddle">
            <div className="searchTop">
              <select
                value={this.state.filterProp}
                className="searchSelect"
                onChange={this.handleChangeISay}
              >
                <option value="first_name">First Name</option>
                <option value="last_name">Last Name</option>
              </select>
              <input
                value={this.state.filter}
                className="searchInput"
                onChange={e => this.handleChange(e.target.value)}
              />
              <button
                id="blackButton"
                className="searchButton"
                onClick={this.search}
              >
                Search
              </button>
              <button
                id="greyButton"
                className="searchButton"
                onClick={this.reset}
              >
                Reset
              </button>
            </div>
            <div className="userSearchContainer">
              {friendBoxes}
              <div className="pageFlip">
                <div className="pageFlipChild">{pages}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(state => state, { getUser })(Search);
