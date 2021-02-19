import React from 'react';
import './Detail.css'

class Detail extends React.Component {
    componentDidMount() {
        const { location, history } = this.props;
        console.log('componentDidMount',location);
        if (location.state === undefined) {
            history.push("/");
        }
    }
    render(){
        const {location} = this.props;
        console.log('render',location);
        if (location.state){
            return(
                <div className="detail__container">
                    <span>{location.state.title}</span>
                </div>
            ) 
        } else{
            return null
        }
        
    }
}
export default Detail;


