# Purrfect Products!

This is my implementation of [this tutorial](https://www.youtube.com/watch?v=Fy9SdZLBTOo), which is an Amazon clone. The site allows you to browse products, add them to the cart, update the cart, and go through a fake checkout process.

I opted to use some `styled-components` and also took advantage of the `@reduxjs/toolkit`, among other significant changes.

# Future Improvements

- Submit orders
  - "Thank You" page
  - Updates state and inventory
- Only allow admins to view the Products Admin page (currently, anyone can view it, but only admins can make changes)
- Profile page
- Image upload on Add Product page
  - Move all local images to the cloud first

# Install

`yarn && yarn run client-install`

# Config

Add a `.env` file with a `DB_URI` value for a MongoDB connection string, as well as a `JWT_SECRET` for `express-session`. See `.sample-env`.

# Dev

`yarn run dev`

# Credits

App icon photo by [Diver Zhang](https://unsplash.com/@wantchai?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) on [Unsplash](https://unsplash.com/s/photos/cat-toy?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText).
