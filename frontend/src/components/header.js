import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import Link from '@material-ui/core/Link';
import { connect } from 'react-redux';
import { logout } from '../redux/action/user';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { withRouter } from 'react-router-dom';
class Header extends Component {
    state = {
        anchorEl: null
    }
    // componentDidMount() {
    //     console.log(this.props)
    // }
    Logout = async () => {
        await this.props.logout();
        this.props.history.push('/login')
        this.setState({
            anchorEl: null
        })
    }
    handleClick = (event) => {
        this.setState({
            anchorEl: event.currentTarget
        })
    };
    handleClose = () => {
        this.setState({
            anchorEl: null
        })
    };
    render() {
        return (
            <div className="root" >
                <AppBar position="static">
                    <Toolbar>
                        <IconButton edge="start" className="menuButton" color="inherit" aria-label="menu">
                            <MenuBookIcon />
                        </IconButton>
                        <Typography variant="h6" className="title" >
                            <Link href={this.props.user && this.props.user.isAuthenticated ? '/#/home' : '/'} style={{ color: "white" }}>
                                Book List
                            </Link>

                        </Typography>
                        {this.props.user && this.props.user.isAuthenticated ?
                            <Button color="inherit" onClick={this.handleClick}>{this.props.user?.user?.name}</Button>
                            : <>
                                <Button color="inherit" href="/#/login">Login</Button>
                                <Button color="inherit" href="/#/register">Register</Button>
                            </>

                        }
                    </Toolbar>
                </AppBar>
                <Menu
                    id="simple-menu"
                    anchorEl={this.state.anchorEl}
                    keepMounted
                    open={Boolean(this.state.anchorEl)}
                    onClose={this.handleClose}
                >
                    <MenuItem onClick={this.Logout}>Logout</MenuItem>
                </Menu>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    //console.log(state)
    return {
        user: state.userReducer
    }

}
export default connect(mapStateToProps, { logout })(withRouter(Header));