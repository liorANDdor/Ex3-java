import React, { useEffect, useState } from 'react'
import { withRouter } from "react-router-dom";

import { makeStyles } from '@material-ui/core/styles';
import axios from "../../../Utilities/Axios/Axios";
import Table from "../../UIComponents/Table/Table";
import Rating from '@material-ui/lab/Rating';


const useStyles = makeStyles((theme) => ({
    container: {
        background: 'inherit',
        width: '80%',
        marginLeft: '20%',
        marginTop: '2%',
        height: '200px',
    }
}));


const ShowFeedbacks = (props) => {
    const [feedbacks, setFeedbacks] = useState([]);

    const classes = useStyles()
    let cols = {
        Rate : {
            header: 'Rate',
        },
        Store:{
            header: 'Store',
        },
        Message : {
            header: 'Message',
        },
        Date : {
            header: 'Date',
        },
        Client : {
            header: 'Customer',
        }
    }


    const loadData = async () => {
        const newFeedbacks =  await axios.post('/SDM/getFeedbacks')

        console.log(newFeedbacks.data)
             setFeedbacks(newFeedbacks.data);
    }

    useEffect(() => {
        loadData()
        const interval = setInterval(async () => {
            loadData()
        }, 2000);
        return () => {
            clearInterval(interval)
        }
    }, [])


    return(
        <div>
            <Table
                columns={cols}
                    data={feedbacks.map(feedback => ({  Client: <Rating name="read-only" value={feedback.rating} readOnly />, Store: feedback.storeName,
                        Date: feedback.comment , Rate: feedback.feedbackDate , Message:feedback.clientName}))}
                container={classes.container} /> </div>
)
};


export default withRouter(ShowFeedbacks)