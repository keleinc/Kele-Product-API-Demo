document.addEventListener("DOMContentLoaded", function () {
    // Fetch categories and subcategories
    fetchCategories();

    // Function to fetch categories and subcategories
    async function fetchCategories() {
        try {
            const categoryResponse = await fetch('https://www.kele.com/api/product/categories/all?enableCaching=true&api-version=2.0');
            const subcategoryResponse = await fetch('https://www.kele.com/api/product/subcategories/all?enableCaching=true&api-version=2.0');
            const categoriesData = await categoryResponse.json();
            const subcategoriesData = await subcategoryResponse.json();

            // Display categories and subcategories in a tree view
            displayCategories(categoriesData.data.categories, subcategoriesData.data.subcategories);
        } catch (error) {
            console.error("Error fetching categories or subcategories: ", error);
        }
    }

    // Display categories and subcategories in a tree view
    function displayCategories(categories, subcategories) {
        const categoryTree = document.getElementById('categoryTree');
        categoryTree.innerHTML = '';  // Clear previous content

        categories.forEach(category => {
            const categoryItem = document.createElement('li');
            categoryItem.textContent = category.name;
            
            // Create subcategory list under category
            const subcategoryList = document.createElement('ul');
            const filteredSubcategories = subcategories.filter(sub => sub.categoryId === category.id);
            filteredSubcategories.forEach(subcategory => {
                const subcategoryItem = document.createElement('li');
                subcategoryItem.textContent = subcategory.name;
                subcategoryItem.addEventListener('click', () => fetchProductsBySubcategory(subcategory.name));
                subcategoryList.appendChild(subcategoryItem);
            });
            
            categoryItem.appendChild(subcategoryList);
            categoryTree.appendChild(categoryItem);
        });
    }

    // Fetch products based on subcategory
    async function fetchProductsBySubcategory(subcategoryName) {
        try {
            const encodedCategory = encodeURIComponent(subcategoryName);
            const postUrl = `https://www.kele.com/api/search/products/search/curated?text=&page=1&perPage=24&filterBy=category%3A%3D%5B%60${encodedCategory}%60%5D&enableOverrides=true&overrideTags=category-${encodedCategory.toLowerCase()}&api-version=2.0`;

            const response = await fetch(postUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ text: '', page: 1, perPage: 24 })
            });

            const productsData = await response.json();
            displayProducts(productsData.data.products);
        } catch (error) {
            console.error("Error fetching products: ", error);
        }
    }

    // Display products in the table
    function displayProducts(products) {
        const productTableBody = document.querySelector('#productTable tbody');
        productTableBody.innerHTML = '';  // Clear previous content

        products.forEach(product => {
            const row = document.createElement('tr');

            const nameCell = document.createElement('td');
            nameCell.textContent = product.name;
            row.appendChild(nameCell);

            const codeCell = document.createElement('td');
            codeCell.textContent = product.productCode;
            row.appendChild(codeCell);

            const priceCell = document.createElement('td');
            priceCell.textContent = product.price ? `$${product.price.toFixed(2)}` : 'N/A';
            row.appendChild(priceCell);

            const descCell = document.createElement('td');
            descCell.textContent = product.shortDescription || 'N/A';
            row.appendChild(descCell);

            productTableBody.appendChild(row);
        });
    }
});
