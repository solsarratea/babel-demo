async function fetchGraphQL(query, variables) {
    const response = await fetch('https://207.154.248.234:4000/graphql', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            query: query
        }),
        mode: "cors"
    });

    // Get the response as JSON
    return await response.json();
}

export default fetchGraphQL;
