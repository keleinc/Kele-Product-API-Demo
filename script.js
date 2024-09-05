document.addEventListener("DOMContentLoaded", function () {
    // Elements
    const getCategoriesBtn = document.getElementById('getCategoriesBtn');
    const getSubcategoriesBtn = document.getElementById('getSubcategoriesBtn');
    const categoryTree = document.getElementById('categoryTree');

    // Fetch categories on button click
    getCategoriesBtn.addEventListener('click', fetchCategories);
    getSubcategoriesBtn.addEventListener('click', fetchSubcategories);

    // Variables to store categories and subcategories
    let categories = [];
    let subcategories = [];

    // Function to fetch categories
    async function fetchCategories() {
        try {
            const response = await fetch('https://www.kele.com/api/product/categories/all?enableCaching=true&api-version=2.0');
            const data = await response.json();
            categories = data.data.categories;
            displayCategories();
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    }

    // Function to fetch subcategories
    async function fetchSubcategories() {
        try {
            const response = await fetch('https://www.kele.com/api/product/subcategories/all?enableCaching=true&api-version=2.0');
            const data = await response.json();
            subcategories = data.data.subcategories;
            displayCategories();  // Redisplay to attach subcategories
        } catch (error) {
            console.error("Error fetching subcategories:", error);
        }
    }

    // Function to display categories and subcategories
    function displayCategories() {
        categoryTree.innerHTML = ''; // Clear previous content

        categories.forEach(category => {
            const categoryItem = document.createElement('li');
            categoryItem.textContent = category.name;

            const subcategoryList = document.createElement('ul');
            const filteredSubcategories = subcategories.filter(sub => sub.categoryId === category.id);

            // Add subcategories under the category
            filteredSubcategories.forEach(subcategory => {
                const subcategoryItem = document.createElement('li');
                subcategoryItem.textContent = subcategory.name;
                subcategoryItem.addEventListener('click', () => fetchProductsBySubcategory(subcategory.name));
                subcategoryList.appendChild(subcategoryItem);
            });

            categoryItem.appendChild(subcategoryList);
            categoryItem.addEventListener('click', function (e) {
                e.stopPropagation();  // Prevent triggering parent click events
                this.classList.toggle('expanded');  // Toggle expansion
            });

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
            console.error("Error fetching products:", error);
        }
    }

    // Display products in the table
    function displayProducts(products) {
        const productTableBody = document.querySelector('#productTable tbody');
        productTableBody.innerHTML = '';  // Clear previous content

        products.forEach(product => {
            const row = document.createElement('tr');

            const nameCell = document.createElement('td');
            nameCell.textContent
