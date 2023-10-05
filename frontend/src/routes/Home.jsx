import { Fragment, useEffect, useState } from "react";
import axios from "axios";
import Landing from "../components/Landing/Landing";
import Categories from "../components/Featured/Categories/FeaturedCategories";


const Home = () => {
   
    return ( 
        <Fragment>
        <Landing />
        <Categories/>
        </Fragment>
    );
}
 
export default Home;