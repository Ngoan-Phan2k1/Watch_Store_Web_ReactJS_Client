import { Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { publicRoutes } from '~/routes';
import { privateRoutes } from '~/routes';
import { adminRoutes } from '~/routes';
import { DefaultLayout } from '~/components/Layout';
import { DataProvider } from '~/components/DataProvider/DataProvider';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';


import { useSelector } from 'react-redux';

import 'bootstrap/dist/css/bootstrap.min.css';
//import './App.scss';


function App() {
  const user = useSelector((state) => state.auth.login.currentUser);
  return (
    <PayPalScriptProvider options={{"client-id": "AeuNHU_zjyo4QfdMycktKrkY-x7zXLnqwox204EK9BV0NUnAdG9Ke_o5JLEciRsYvzHtOePldE7di8ZA"}}>

      <DataProvider>
        <Router>     
          <div className="App">
            <Routes>
              {publicRoutes.map((route, index) => {
                const Page = route.component
                let Layout = DefaultLayout

                if (route.layout)
                  Layout = route.layout
                else if (route.layout === null)
                  Layout = Fragment

                return (
                  <Route
                    key={index}
                    path={route.path}
                    element={
                      <Layout>
                        <Page />
                      </Layout>
                    }
                  />
                )
              })}

              {user && privateRoutes.map((route, index) => {
                const Page = route.component
                let Layout = DefaultLayout

                if (route.layout)
                  Layout = route.layout
                else if (route.layout === null)
                  Layout = Fragment

                return (
                  <Route
                    key={index}
                    path={route.path}
                    element={
                      <Layout>
                        <Page />
                      </Layout>
                    }
                  />
                )
              })}


              {user?.admin && adminRoutes.map((route, index) => {
                const Page = route.component
                let Layout = DefaultLayout

                if (route.layout)
                  Layout = route.layout
                else if (route.layout === null)
                  Layout = Fragment

                return (
                  <Route
                    key={index}
                    path={route.path}
                    element={
                      <Layout>
                        <Page />
                      </Layout>
                    }
                  />
                )
              })}

            </Routes>
          </div>

        </Router>
      </DataProvider>


    </PayPalScriptProvider>
    

  );
}

export default App;
