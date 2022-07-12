# Uniform BigCommerce enhancer
With localization support

1. Connect it to a Uniform project with BigCommerce v2 integration installed.
2. Fill out .env file:
   ```
    # Uniform settings
    #UNIFORM_CLI_BASE_URL=https://canary.uniform.app
    UNIFORM_API_KEY=
    UNIFORM_PROJECT_ID=

    # BigCommerce
    BIGCOMMERCE_STORE_HASH=
    BIGCOMMERCE_GQL_TOKEN=
    ```
3. `npm install`
4. `npm run dev` to run locally.
5. Open a composition by slug: `http://localhost:3000/my-composition-slug`, and make sure it renders.
6. Open the same composition with localization in url (`/es`): `http://localhost:3000/es/my-composition-slug` it should render all meta fields from the product with `es` namespace.