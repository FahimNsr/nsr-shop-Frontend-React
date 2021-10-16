import { useEffect } from "react";
import { withRouter } from "react-router-dom";

import { useDispatch } from "react-redux";

import { userAction } from "../../redux/action";

const Logout = ({ history }) => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(userAction.logout());
        history.replace("/");
    }, [dispatch, history]);

    return null;
};

export default withRouter(Logout);
