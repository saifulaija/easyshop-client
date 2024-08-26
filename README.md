# Server GitHub Link
You can access the server side GitHub Link at [Easy Shop Server GitHub](https://github.com/saifulaija/easyshop-server).
# EasyShop Frontend

This repository contains the frontend code for the **EasyShop** project. The frontend application is designed to visualize various business metrics using data fetched from the `RQ_Analytics` backend. This includes charts for total sales, sales growth, new customers, repeat customers, geographical distribution, and customer lifetime value.

## Live Link
The live version of the EasyShop frontend can be accessed at [EasyShop](https://easyshop-nine.vercel.app/).

## Table of Contents
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [API Integration](#api-integration)
- [Components Overview](#components-overview)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Features

- **Total Sales Over Time**: Displays total sales data aggregated by daily, monthly, quarterly, and yearly intervals using data from `shopifyOrders`.
- **Sales Growth Rate Over Time**: Visualizes the growth rate of sales over different time periods.
- **New Customers Added Over Time**: Tracks and visualizes the addition of new customers based on their creation date in `shopifyCustomers`.
- **Number of Repeat Customers**: Identifies and displays the number of customers with more than one purchase, segmented by daily, monthly, quarterly, and yearly time frames.
- **Geographical Distribution of Customers**: Maps customer locations based on their city, as recorded in `shopifyCustomers`.
- **Customer Lifetime Value by Cohorts**: Groups customers by the month of their first purchase and visualizes the lifetime value of each cohort.

## Technologies Used

- **React.js**: For building the user interface.
- **Tailwind CSS**: For styling the application with a utility-first CSS framework.
- **ShadCN UI**: For using pre-designed UI components.
- **Chart.js**: For creating interactive and responsive charts.

## Installation

To get started with the EasyShop frontend locally, follow these steps:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/saifulaija/easyshop-client
   cd easyshop-frontend
