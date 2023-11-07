import AuthContext from '../../context/AuthContext'

// Use AuthContext to get userId
const { authTokens, userId } = useContext(AuthContext);

// base API endpoint
const baseEndpoint = "http://localhost:8000/api";

// helper function for backend api call
let filterCategory = async (categories) => {
    try {
        let response = await fetch(`${baseEndpoint}/products/?categories=${categories}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                //'Authorization':'Bearer ' + String(authTokens.access) // add token if authorization is needed to filter
            },
        });

        if (response.status === 200) {
            let data = await response.json();
            // TO DO: do something with the data eg(renderProducts) 
            doSomething(data);
        } else {
            alert('Something went wrong!');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Something went wrong!');
    }
}

// Example function to render the products (you can customize this)
function renderProducts(data) {
    // Assuming data is an array of products
    // You can iterate through the products and display them as needed
    data.forEach(product => {
        // Render product information as need - see 'products/model' in backend to see current fields
        console.log('Product Title:', product.title);
        console.log('Product Content:', product.content);
        // Add your rendering logic here (e.g., append to a list or update the DOM)
        
    });
}