import React, {useState, useEffect} from 'react'

import Info from './Info'
import Axios from 'axios'

const CompanyPage = (props) => {
    const [info, setInfo] = useState();
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        Axios({
          method: "get",
          url: "https://jsonplaceholder.typicode.com/users",
        })
          .then((response) => {
            setInfo(response.data);
            setLoading(false);
          })
          .catch((error) => {
            console.log(error);
          });
        return () => {};
    }, []);

    if (isLoading) {
        return <div>Loading...</div>;
    } else {
        const company_id = props.match.params.id;
        const result = info.find(info_e => info_e.id == company_id);

        return (
            <div>
                {result ?
                    <Info
                        company_title={result.company.name}
                        email={result.email}
                        phone={result.phone}
                        website={result.website}
                        phrase={result.company.catchPhrase}
                    /> : null
                }
            </div>
        )
    }

    
}

export default CompanyPage;