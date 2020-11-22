import React, { useState , useEffect } from 'react';

import Company from './Company';
import './Company.css';
import Axios from "axios";

const Companies = () => {
    const [company, setCompany] = useState();

    useEffect(() => {
        Axios({
          method: "get",
          url: "https://jsonplaceholder.typicode.com/photos?_limit=10",
        })
          .then((response) => {
            setCompany(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
        return () => {};
    }, []);

    return (
        <div className="company-list">
            {company ? company.map(company_e => 
                <Company
                    title={company_e.title}
                    url={company_e.thumbnailUrl}
                    id={company_e.id}
                />) : null
            }
        </div>
    )
}

export default Companies;