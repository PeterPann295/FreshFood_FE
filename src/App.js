import logo from './logo.svg';
import './App.css';
import {Outlet} from "react-router-dom";
import Header from './components/common/header/Header';
import FeaturedCategories from "./components/common/category/FearturedCategories";
import PopularProducts from "./components/product/PopularProducts";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import ProductDetailsMain from "./components/product-detail/ProductDetailsMain";
import Layout from './page/Layout';
function App() {
  return (
    <div>
      <Layout>
          <Outlet/>
      </Layout>
    </div>

  );
}

export default App;
