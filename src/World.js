import './styles/World.css';
import React from 'react';
import fetchGraphQL from './fetchGraphQL';
import sortBy from 'lodash/sortBy';
import {Link, useParams} from 'react-router-dom';
const { useState, useEffect } = React;


function Quotes({data}) {
    return (
        <div className="container-row">
            {data.map(({quote},idx) =>
                <div className="element" key={idx}>
                    {quote}
                </div>
            )}
        </div>
    );
}

function CoocuringCodes ({data}) {
    return (
        <div className="container-row">
            {data.map(({name, annotations_count},idx) => {
                const size = Math.min(50,annotations_count)+8;
                const weight = Math.pow(1.1,annotations_count);
                const color = (weight + Math.pow(16, 6)).toString(16).substr(-6)
              const style = {
                  textDecoration: `none`,
                  color: `#${color}`,
                  fontSize: size,

                };
                return(
                    <div className="element"
                         key={idx}>
                        <Link style={style}
                              to={`/${name}`}>
                            {name}
                        </Link>
                    </div>)
            }
            )}
        </div>

    );
}
function World(){
    const {name} = useParams();
    const [ code , setCode ] = useState(null);
    const [ count , setCount ] = useState(null);
    const [ color , setColor ] = useState(null);

    const [ quotes, setQuotes ] = useState(null);
    const [ coocurringCodes, setCoocurringCodes ] = useState(null);

    const query = (name) => {return `{
    code: code(name: "${name}") {
      discourse_id
      name
      description
      annotations_count
      annotations {
        quote
        post_id
       }
      cooccurring_codes {
              discourse_id
              name
              annotations_count
              description
              cooccurrences
              annotations {
                quote
                post_id
              }
            }
          }}`};

    useEffect(() => {
        let isMounted = true;
        fetchGraphQL(
            query(name)
        ).then(response => {
               if (!isMounted) {
                return;
            }
            const data = response.data.code[0];
            window.data = data;
            console.log(data)
            var sortedCodes = sortBy(data.cooccurring_codes, "annotations_count").reverse()
            setCode(data.name);
            setQuotes(data.annotations);
            setCount(data.annotations_count);
            setCoocurringCodes(sortedCodes);

            const weight = Math.pow(1.1,data.annotations_count);
            const color = (weight + Math.pow(16, 6)).toString(16).substr(-6)
            console.log(color)
            setColor(color)


        }).catch(error => {
            console.error(error);
        });

        return () => {
            isMounted = false;
        };
    }, [fetchGraphQL, name]);


    return (
        <div className="World">
            {code ?
             <h1 style={{top: 10, left: 50,
                     position:'fixed',
                     color: `#${color}`}}>
                {`${code}`}
            </h1>:
             <p>{"Loading"}</p>
            }
            <div className="WorldContent">
                {quotes ?
                 <Quotes data={ quotes }/>
                 : null }

                {coocurringCodes ?
                 <CoocuringCodes data={ coocurringCodes }/>
                 : null }


            </div>

        </div>
    );

}

export default World;
