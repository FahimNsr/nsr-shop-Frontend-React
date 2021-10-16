import { userService } from "../../services";
import { userConstants } from "../constants";
import { decodeToken } from "../../helpers";

export const userAction = {
    register,
    login,
    logout,
};

function register(user) {
    return (dispatch) => {
        dispatch({ type: userConstants.REGISTER_REQUEST });
        console.log(userService.register(user));

        userService
            .register(user)
            .then(
                (user) => {
                    dispatch({ type: userConstants.REGISTER_SUCCESS });
                },
                (error) => {
                    dispatch({ type: userConstants.REGISTER_FAILURE, error: error.response.data });
                }
            )
            .catch((err) => {
                console.log(err);
            });
    };
}

function login(email, password) {
    return (dispatch) => {
        dispatch({ type: userConstants.LOGIN_REQUEST });

        userService
            .login(email, password)
            .then(
                ({ data }) => {
                    localStorage.setItem("token", data.token);
                    dispatch({ type: userConstants.LOGIN_SUCCESS, token: data.token, userInfo: decodeToken(data.token) });
                },
                (error) => {
                    dispatch({ type: userConstants.LOGIN_FAILURE, error: error.response });
                }
            )
            .catch((err) => {
                console.log(err);
            });
    };
}

function logout() {
    userService.logout();
    return { type: userConstants.LOGOUT };
}
