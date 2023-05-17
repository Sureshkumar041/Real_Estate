// import React from 'react';
// import { useNavigate } from 'react-router-dom';

// const Hello = () => {
//     const navigate = useNavigate();
//     const handleClick = () => {
//         if (1) navigate('/admin');
//         else console.log("Unable to navigate");
//     }

//     return (
//         <button type="button" className='btn btn-info mx-2 my-2' onClick={handleClick}>
//             Navigate
//         </button>
//     );
// };

// export default Hello;

import * as React from "react";
// import { Navigate } from "react-router-dom";
import { withRouter } from "../NavigateComponent/router";

class Hello extends React.Component {
    state = { user: null, error: null };

    fun = () => {
        this.props.navigate('/admin');
    }

    async handleSubmit(event) {
        event.preventDefault();
        try {
            this.fun();
        } catch (error) {
            this.setState({ error });
        }
    }

    render() {
        let { error } = this.state;
        return (
            <div>
                {error && <p>{error.message}</p>}
                <form
                    onSubmit={(event) => this.handleSubmit(event)}
                >
                    <input type="text" name="username" />
                    <input type="password" name="password" />
                    <button type="submit"> Submit</button>
                </form>
            </div>
        );
    }
}

export default withRouter(Hello);