import { connect } from "react-redux";
import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router";
import {
  Navbar,
  Nav,
  NavItem,
  NavLink,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Badge,
  ButtonGroup,
  Button,
} from "reactstrap";
import PowerIcon from "../Icons/HeaderIcons/PowerIcon";
import BellIcon from "../Icons/HeaderIcons/BellIcon";
import SettingsIcon from "../Icons/HeaderIcons/SettingsIcon";
import BurgerIcon from "../Icons/HeaderIcons/BurgerIcon";
import ArrowIcon from "../Icons/HeaderIcons/ArrowIcon";

import { logoutUser } from "../../actions/user";
import {
  openSidebar,
  closeSidebar,
  changeSidebarPosition,
  changeSidebarVisibility,
} from "../../actions/navigation";

import s from "./Header.module.scss";
import "animate.css";

class Header extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    sidebarPosition: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);

    this.doLogout = this.doLogout.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
    this.toggleMessagesDropdown = this.toggleMessagesDropdown.bind(this);
    this.toggleSupportDropdown = this.toggleSupportDropdown.bind(this);
    this.toggleSettingsDropdown = this.toggleSettingsDropdown.bind(this);
    this.toggleAccountDropdown = this.toggleAccountDropdown.bind(this);
    this.toggleSidebar = this.toggleSidebar.bind(this);
    this.toggleSearchOpen = this.toggleSearchOpen.bind(this);

    this.state = {
      visible: true,
      messagesOpen: false,
      supportOpen: false,
      settingsOpen: false,
      searchFocused: false,
      searchOpen: false,
      notificationsOpen: false,
    };
  }

  toggleNotifications = () => {
    this.setState({
      notificationsOpen: !this.state.notificationsOpen,
    });
  };

  onDismiss() {
    this.setState({ visible: false });
  }

  doLogout() {
    this.props.dispatch(logoutUser());
  }

  toggleMessagesDropdown() {
    this.setState({
      messagesOpen: !this.state.messagesOpen,
    });
  }

  toggleSupportDropdown() {
    this.setState({
      supportOpen: !this.state.supportOpen,
    });
  }

  toggleSettingsDropdown() {
    this.setState({
      settingsOpen: !this.state.settingsOpen,
    });
  }

  toggleAccountDropdown() {
    this.setState({
      accountOpen: !this.state.accountOpen,
    });
  }

  toggleSearchOpen() {
    this.setState({
      searchOpen: !this.state.searchOpen,
    });
  }

  toggleSidebar() {
    this.props.isSidebarOpened
      ? this.props.dispatch(closeSidebar())
      : this.props.dispatch(openSidebar());
  }

  moveSidebar(position) {
    this.props.dispatch(changeSidebarPosition(position));
  }

  toggleVisibilitySidebar(visibility) {
    this.props.dispatch(changeSidebarVisibility(visibility));
  }

  render() {
    return (
      <Navbar className={`d-print-none `}>
        <div className={s.burger}>
          <NavLink
            onClick={this.toggleSidebar}
            className={`d-md-none ${s.navItem} text-white`}
            href="#"
          >
            <BurgerIcon className={s.headerIcon} />
          </NavLink>
        </div>
        <div className={`d-print-none ${s.root}`}>
          <Nav className="ml-md-0">
            <Dropdown
              className="d-none d-sm-block"
              nav
              isOpen={this.state.settingsOpen}
              toggle={this.toggleSettingsDropdown}
            >
              <DropdownToggle nav className={`${s.navItem} text-white`}>
                <SettingsIcon
                  addId="header-settings"
                  className={s.headerIcon}
                />
              </DropdownToggle>
              <DropdownMenu className={`${s.dropdownMenu} ${s.settings}`}>
                <h6>Sidebar on the</h6>
                <ButtonGroup size="sm">
                  <Button
                    color="primary"
                    onClick={() => this.moveSidebar("left")}
                    className={
                      this.props.sidebarPosition === "left" ? "active" : ""
                    }
                  >
                    Left
                  </Button>
                  <Button
                    color="primary"
                    onClick={() => this.moveSidebar("right")}
                    className={
                      this.props.sidebarPosition === "right" ? "active" : ""
                    }
                  >
                    Right
                  </Button>
                </ButtonGroup>
                <h6 className="mt-2">Sidebar</h6>
                <ButtonGroup size="sm">
                  <Button
                    color="primary"
                    onClick={() => this.toggleVisibilitySidebar("show")}
                    className={
                      this.props.sidebarVisibility === "show" ? "active" : ""
                    }
                  >
                    Show
                  </Button>
                  <Button
                    color="primary"
                    onClick={() => this.toggleVisibilitySidebar("hide")}
                    className={
                      this.props.sidebarVisibility === "hide" ? "active" : ""
                    }
                  >
                    Hide
                  </Button>
                </ButtonGroup>
              </DropdownMenu>
            </Dropdown>
            <Dropdown
              className="d-none d-sm-block"
              nav
              isOpen={this.state.supportOpen}
              toggle={this.toggleSupportDropdown}
            >
              <DropdownToggle nav className={`${s.navItem} text-white`}>
                <BellIcon className={s.headerIcon} />
                <div className={s.count}></div>
              </DropdownToggle>
              <DropdownMenu right className={`${s.dropdownMenu} ${s.support}`}>
                <DropdownItem>
                  <Badge color="danger">
                    <i className="fa fa-bell-o" />
                  </Badge>
                  <div className={s.details}>Check out this awesome ticket</div>
                </DropdownItem>
                <DropdownItem>
                  <Badge color="warning">
                    <i className="fa fa-question-circle" />
                  </Badge>
                  <div className={s.details}>
                    What is the best way to get ...
                  </div>
                </DropdownItem>
                <DropdownItem>
                  <Badge color="success">
                    <i className="fa fa-info-circle" />
                  </Badge>
                  <div className={s.details}>
                    This is just a simple notification
                  </div>
                </DropdownItem>
                <DropdownItem>
                  <Badge color="info">
                    <i className="fa fa-plus" />
                  </Badge>
                  <div className={s.details}>
                    12 new orders has arrived today
                  </div>
                </DropdownItem>
                <DropdownItem>
                  <Badge color="danger">
                    <i className="fa fa-tag" />
                  </Badge>
                  <div className={s.details}>
                    One more thing that just happened
                  </div>
                </DropdownItem>
                <DropdownItem>
                  {/* eslint-disable-next-line */}
                  <a href="#" className="text-white">
                    See all tickets{" "}
                    <ArrowIcon className={s.headerIcon} maskName="bellArrow" />
                  </a>
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
            <NavItem>
              <NavLink
                onClick={this.doLogout}
                className={`${s.navItem} text-white`}
                href="#"
              >
                <PowerIcon className={s.headerIcon} />
              </NavLink>
            </NavItem>
          </Nav>
        </div>
      </Navbar>
    );
  }
}

function mapStateToProps(store) {
  return {
    isSidebarOpened: store.navigation.sidebarOpened,
    sidebarVisibility: store.navigation.sidebarVisibility,
    sidebarPosition: store.navigation.sidebarPosition,
  };
}

export default withRouter(connect(mapStateToProps)(Header));
