import { Outlet } from "react-router-dom";

const Main = () => {
    return (
        <div>
            <h2 className="text-5xl text-center">Main Layout</h2>
            <Outlet></Outlet>
        </div>
    );
};

export default Main;