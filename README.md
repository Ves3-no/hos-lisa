
# Custom E-Commerce Platform

A fully custom-built e-commerce platform featuring a modern storefront, secure payment processing, and a comprehensive administration dashboard.

Built from scratch using React, TypeScript, Tailwind CSS, Supabase, and Stripe.

> **Status:** Under active development. Not yet ready for production.

## Overview

This project is a complete e-commerce solution developed for a real business. It provides customers with a seamless shopping experience while allowing the business owner to manage products, orders, images, and website content through a dedicated administration dashboard.

The platform is designed to be scalable, maintainable, and easy to manage without technical knowledge.

## Tech Stack

| Technology | Purpose |
| :--- | :--- |
| React | Frontend framework |
| TypeScript | Type-safe development |
| Tailwind CSS | Styling and responsive design |
| Supabase | PostgreSQL database and authentication |
| Supabase Storage | Product and website images |
| Supabase Edge Functions | Secure backend operations |
| Stripe | Payment processing |
| Netlify | Hosting and deployment |

## Features

### Storefront

- Fully responsive, custom-designed interface
- Dynamic product listings
- Product information and images
- Shopping cart with localStorage persistence
- Secure checkout using Stripe
- Automated order confirmation emails
- Order tracking information
- Legal and informational pages
- Database-driven website content

### Administration Dashboard

A custom dashboard designed to let the business owner manage daily operations without editing code.

- Secure employee authentication using Supabase Auth
- Product creation, editing, and management
- Product image management
- Order overview and management
- Order status updates
- Shipment tracking number management
- Customer notifications
- Automated email functionality
- Website content and legal page editing

### Payments

Payments are processed securely through Stripe Checkout.

- Dynamic checkout session creation
- Server-side payment processing
- Stripe webhook integration
- Order confirmation handling
- Automated notifications for customers and the business owner

Payment credentials are stored securely and are never exposed in frontend code.

## Architecture

The frontend communicates with Supabase for product data, website content, and authorized administration operations.

Supabase Edge Functions handle sensitive backend operations, including Stripe integration and automated processes.

Stripe handles payment processing, while Supabase PostgreSQL stores application data.

## Security

The application is designed with security in mind.

- Supabase Row Level Security (RLS)
- Restricted employee authentication
- Server-side validation of sensitive operations
- Secure handling of API credentials
- Stripe webhook verification
- Protected administration functionality
- Environment-based configuration

Security configurations and integrations must be tested before production deployment.

## Development Status

The platform is currently under active development.

The storefront and administration dashboard are being completed, tested, and prepared for production deployment.

Additional improvements and functionality may be introduced as the business grows.

## Ownership and License

**Copyright (c) 2026 Ves3. All rights reserved.**

This project is publicly available for viewing and portfolio purposes.

The source code is proprietary and is not released under an open-source license.

Unless explicitly authorized by the copyright holder, permission is not granted to copy, modify, redistribute, sublicense, or commercially use the source code.

Third-party libraries and dependencies remain subject to their respective licenses.

## Developer

Developed by **Ves3**.

GitHub: https://github.com/Ves3-no

Portfolio: https://ves3.no
