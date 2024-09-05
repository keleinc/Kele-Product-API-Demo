# Kele Product API Demo

This repository contains a simple web application that demonstrates how to interact with Kele.com's product API. The app retrieves and displays product category, subcategory, and product search data in a user-friendly table format, allowing for easy testing and review of the API endpoints.

## Features

- **Get Categories**: Fetches and displays all available product categories from the Kele.com API.
- **Get Subcategories**: Fetches and displays all available product subcategories.
- **Search Products**: Sends a POST request to search for products in the "Access Control" category and displays the results.

## API Endpoints

This demo interacts with the following Kele.com API endpoints:

1. **Get All Categories (GET Request)**  
   URL: `https://www.kele.com/api/product/categories/all?enableCaching=true&api-version=2.0`  
   Retrieves all available product categories.

2. **Get All Subcategories (GET Request)**  
   URL: `https://www.kele.com/api/product/subcategories/all?enableCaching=true&api-version=2.0`  
   Retrieves all available product subcategories.

3. **Search Products in "Access Control" Category (POST Request)**  
   URL: `https://www.kele.com/api/search/products/search/curated?text=&page=1&perPage=24&filterBy=category%3A%3D%5B%60ACCESS%20CONTROL%60%5D&enableOverrides=true&overrideTags=category-access-control&api-version=2.0`  
   Searches for products within the "Access Control" category.

## How It Works

- The application provides three buttons to trigger the respective API calls.
- When a button is clicked, the app sends the corresponding request and displays the returned data in a table format for easy review.
- The product search specifically targets the "Access Control" category using a POST request.

## How to Run Locally

1. Clone this repository:
   ```bash
   git clone https://github.com/your-username/Kele-Product-API-Demo.git
