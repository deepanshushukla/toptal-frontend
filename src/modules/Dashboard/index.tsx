import React, {useContext} from "react";

//context
import UserContext from "context/userContext";

const Dashboard = () =>{
     const userDetails= useContext(UserContext);
     console.log('userDetails',userDetails)
    return (<h3>DashBoard</h3>);
};
export default Dashboard