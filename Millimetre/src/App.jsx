import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import SignUp from "./components/SignUp";
import Nav from "./components/Nav";
import LandingNav from "./components/LandingNav"; // Import the landing navigation
import MyShopPage from "./pages/MyShopPage";
import ProductsPage from "./pages/ProductsPage";
import CollectionsPage from "./pages/Collections";
import BlogPage from "./pages/BlogPage";
import DesignPage from "./pages/DesignPage";
import LinksPage from "./pages/LinksPage";
import BrandsPage from "./pages/BrandsPage";
import MyOrderPage from "./pages/MyOrderPage";
import AccountsPage from "./pages/AccountsPage";
import EarningsPage from "./pages/EarningsPage";
import BankInformetionPage from "./pages/BankInformetionPage";
import FAQPage from "./pages/FAQPage";
import PayoutPage from "./pages/PayoutPage";
import ProductDetails from "./components/ProductDetails";
import BlogPost from "./components/BlogPost";
import PageNotFound from "./pages/PageNotFound";
import MainPage from "./pages/MainPage";
import SignIn from "./components/SignIn";
import TellUsAbout from "./components/TellUsAbout";
import AfterButtonExplosion from "./components/AfterButtonExplosion";
import BrandsProductsPage from "./pages/BrandsProductsPage";
import AllProductsPage from "./pages/AllProductsPage";
import { useUserContext } from "../mnf_context/userContext";
import UpdateShopPage from "./pages/UpdateShopPage";
import BrandContact from "./components/BrandContact";
import BrandCreate from "./components/BrandCreate";
import BrandSitePlatform from "./components/BrandSitePlatform";
import BrandSignUp from "./components/BrandSignUp";
import BrandNav from "./components/BrandNav";
import BrandProduct from "./components/BrandProduct";
import StoreFrontBody from "./components/StoreFrontBody";
import StoreFrontAllProduct from "./components/StoreFrontProductCategory";
import StoreFrontProductDetails from "./components/StoreFrontProductDetails";
import BrandTable from "./components/BrandTable";
import BrandUpload from "./components/BrandUpload";
import BrandProductsUpdate from "./components/BrandProductsUpdate";
import CollectionCreate from "./components/CollectionCreate";
import StoreFrontNav from "./components/StoreFrontNav";
import StorefrontHome from "./components/StorefrontHome";
import StoreFrontProducts from "./components/StoreFrontProducts";
import StoreFrontProductByCategories from "./components/StoreFrontProductByCategories";
import StoreFrontCartDetails from "./components/StoreFrontCartDetails";
import Success from "./components/success";
import StoreFrontProductByProducts from "./components/StoreFrontProductByProducts";
import StoreFrontproductByCollections from "./components/StoreFrontproductByCollections";
import AdminNav from "./components/MasterAdmin/AdminNav";
import CardHead from "./components/MasterAdmin/CardHead";
import AdminBrandTable from "./components/MasterAdmin/AdminBrandTable";
import InfTable from "./components/MasterAdmin/InfTable";
import AdminBrandDetails from "./components/AdminBrandDetails";
import StorefrontSignin from "./components/StorefrontSignin";
import StoreFrontSignUp from "./components/StoreFrontSignUp";
import Shipping from "./components/Shipping";
import ProtectedRoute from "./utils/ProtectedRoute";
// import StoreFrontProfile from "./components/StoreFrontProfile";
// import AdminNav from "./components/MasterAdmin/AdminNav";
// import AdminSignin from "./components/MasterAdmin/AdminSignin";
// import CardHead from "./components/MasterAdmin/CardHead";
import { useSelector } from "react-redux";
import Orders from "./components/Orders";
import StoreFrontWishlist from "./components/StoreFrontWishlist";
import CollectionsView from "./components/CollectionsView";
function App() {
  const userData = useSelector((state) => state?.user?.user);
  const { loginUser } = useUserContext();
  const { isAuthenticated } = useSelector((state) => state.auth);

  return (
    <Router>
      <Routes>
        <Route
          path="*"
          element={
            loginUser === "infUser" ? (
              <InfluencerApp />
            ) : loginUser === "brandUser" ? (
              <BrandApp />
            ) : loginUser === "adminUser" ? (
              <AdminApp />
            ) : (
              <UnauthenticatedApp />
            )
          }
        />
        {/* <Route path="storefrontbody/:id/:type" element={<StorefrontHome />} /> */}
        <Route exact path="/:id/categories" element={<StoreFrontProducts />} />
        <Route path="/success" element={<Success />} />
        <Route
          path="/:id/:type/:item"
          element={<StoreFrontProductByCategories />}
        />
        <Route path="/:id/products" element={<StoreFrontProductByProducts />} />
        <Route
          path="/:id/collections"
          element={<StoreFrontproductByCollections />}
        />
        <Route
          path="/:id/:type/:item/:id"
          element={<StoreFrontProductDetails />}
        />
        <Route
          path="/:id/:type/:type/:item/:id"
          element={<StoreFrontProductDetails />}
        />
        <Route path="/:id/cart" element={<StoreFrontCartDetails />} />

        <Route
          path="/:id/signup"
          element={!userData ? <StoreFrontSignUp /> : <StoreFrontProducts />}
        />
        <Route path="*" element={<PageNotFound />} />

        {/* <Route path="/dashboardadmin" element={<AdminNav />} /> */}
        {/* <Route path="/dashboardadmin/signin" element={<AdminSignin />} /> */}
        {/* <Route path="/dashboardadmin/card" element={<CardHead />} /> */}

        <Route path="/:id/signin" element={<StorefrontSignin />} />
        <Route path="/:id/shipping" element={<Shipping />} />

        <Route path="/:id/orders" element={<Orders />} />
        <Route path="/:id/wishlist" element={<StoreFrontWishlist />} />
      </Routes>
    </Router>
  );
}

function InfluencerApp() {
  return (
    <Nav>
      <Routes>
        <Route exact path="/" element={<MyShopPage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="collections" element={<CollectionsPage />} />
        <Route path="collection/create" element={<CollectionCreate />} />
        <Route path="collections/:id" element={<CollectionsView />} />
        <Route path="blog" element={<BlogPage />} />
        <Route path="design" element={<UpdateShopPage />} />
        <Route path="links" element={<LinksPage />} />
        <Route path="discoverbrands" element={<BrandsPage />} />
        <Route path="myorders" element={<MyOrderPage />} />
        <Route path="settings" element={<AccountsPage />} />
        <Route path="earnings" element={<EarningsPage />} />
        <Route path="payouts" element={<PayoutPage />} />
        <Route path="bankinformation" element={<BankInformetionPage />} />
        <Route path="faq" element={<FAQPage />} />
        {/* <Route path="logout" element={<LogoutPage />} /> */}
        <Route path="productDetails" element={<ProductDetails />} />
        <Route path="blogpost" element={<BlogPost />} />
        {/* //brands */}
        <Route path="brands" element={<BrandsPage />} />
        <Route path="allproducts" element={<AllProductsPage />} />
        <Route path="brandpage/:id" element={<BrandsProductsPage />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Nav>
  );
}
// Brand App sumit testing
function BrandApp() {
  return (
    <BrandNav>
      <Routes>
        <Route path="/" element={<BrandProduct />} />
        <Route path="/products" element={<BrandTable />} />
        <Route path="/addproduct" element={<BrandUpload />} />
        <Route path="/update/:id" element={<BrandProductsUpdate />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrandNav>
  );
}

function AdminApp() {
  return (
    <AdminNav>
      <Routes>
        <Route>
          <Route path="/adminpannel" element={<CardHead />} />
          <Route path="/adminpannel/brand" element={<AdminBrandTable />} />
          <Route path="/adminpannel/influencer" element={<InfTable />} />
          <Route
            path="/adminpannel/brandpage/:id"
            element={<AdminBrandDetails />}
          />
        </Route>
      </Routes>
    </AdminNav>
  );
}

function UnauthenticatedApp() {
  return (
    <>
      <LandingNav />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="register" element={<SignUp />} />
        <Route path="login" element={<SignIn />} />
        <Route exact path="tellus" element={<TellUsAbout />} />
        <Route exact path="welcome" element={<AfterButtonExplosion />} />
        <Route exact path="design" element={<DesignPage />} />
        {/* brands signup */}
        <Route exact path="brand-signup" element={<BrandSignUp />} />
        <Route exact path="brand-create" element={<BrandCreate />} />
        <Route exact path="brand-platforms" element={<BrandSitePlatform />} />
        <Route exact path="brand-contact" element={<BrandContact />} />
        <Route path="*" element={<PageNotFound />} />

        {/* Other landing page routes */}
      </Routes>
    </>
  );
}

export default App;

//sumit...
