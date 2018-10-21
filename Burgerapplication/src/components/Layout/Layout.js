import React,{Component} from 'react'
import Aux from '../../hoc/Auxillary'
import classes from './Layout.module.css'
import Toolbar from '../Navigation/Toolbar/Toolbar'
import SideDrawer from '../Navigation/SideDrawer/SideDrawer'
import {connect} from 'react-redux'

class Layout extends Component {

    state = {
        showSideDrawer : false
    }
    SideDrawerCloseHandler = () => {
        this.setState({
            showSideDrawer : false
        });
    }

    drawerToggleCLicked = () => {
        this.setState((prevState) => { return {showSideDrawer : !prevState.showSideDrawer};
    });
    }
    render () {
        return (
            <Aux>
                <Toolbar isAuthenticated={this.props.userId} drawerToggleCLicked={this.drawerToggleCLicked}/>
                <SideDrawer isAuthenticated={this.props.userId} closed={this.SideDrawerCloseHandler} open={this.state.showSideDrawer}/>
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        )
    }
}

const mapStateToProps = state =>{
    return {
        userId :state.auth.userId
    }
}
export default connect(mapStateToProps)(Layout);