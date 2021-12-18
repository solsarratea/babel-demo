import React from 'react';
import fetchGraphQL from './fetchGraphQL';
import sortBy from 'lodash/sortBy';

const { useState, useEffect } = React;

function Quotes({data}) {
    return (
        <div>
            {data.map(({quote},idx) =>
                <div key={idx}>
                    {quote}
                </div>
            )}
        </div>
    );
}

function CoocuringCodes ({data}) {
    return (
        <div>
            {data.map(({name},idx) =>
                <div key={idx}>
                    {name}
                </div>
            )}
        </div>

    );
}
function World({name}){
    const [ code , setCode ] = useState(null);
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
            query("Mother")
        ).then(response => {
               if (!isMounted) {
                return;
            }
            const data = response.data.code[0];
            window.data = data;
            console.log(data)
            var sortedCodes = sortBy(data.cooccurring_codes, "annotations_count").reverse()
            setCode(data.name);
            setQuotes(data.annotations)
            setCoocurringCodes(sortedCodes);

            window.s = sortedCodes;


        }).catch(error => {
            console.error(error);
        });

        return () => {
            isMounted = false;
        };
    }, [fetchGraphQL]);

    return (
        <div>
            <p>
                {code ? ` ${code}` : "Loading"}
            </p>
            {quotes && false ?
             <Quotes data={ quotes }/>
             : null }
            {coocurringCodes ?
             <CoocuringCodes data={ coocurringCodes }/>
             : null }

        </div>
    );

}

export default World;
